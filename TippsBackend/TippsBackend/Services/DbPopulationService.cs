namespace TippsBackend.Services;

public class DbPopulationService : BackgroundService
{
  private TipsContext _db = null!;
  private readonly IServiceProvider _serviceProvider;

  public DbPopulationService(IServiceProvider serviceProvider) => _serviceProvider = serviceProvider;

  protected override Task ExecuteAsync(CancellationToken stoppingToken)
  {
    Console.WriteLine("DbPopulationService executing...");
    using IServiceScope scope = _serviceProvider.CreateScope();
    _db = scope.ServiceProvider.GetRequiredService<TipsContext>();
    //Console.WriteLine("Database.EnsureDeleted"); _db.Database.EnsureDeleted();
    Console.WriteLine("Database.EnsureCreated"); _db.Database.EnsureCreated();
    CheckPopulateDb();
    return Task.Run(() => { }, stoppingToken);
  }

  public void CheckPopulateDb()
  {
    Console.WriteLine("CheckPopulateDb");
    if (!_db.Tippers.Any()) PopulateTippers();
    if (!_db.MatchWithResults.Any()) PopulateMatches();
    if (!_db.MatchTips.Any()) PopulateMatchTips();
    Console.WriteLine($"Nr Matches: {_db.MatchWithResults.Count()}");
    Console.WriteLine($"Nr Tippers: {_db.Tippers.Count()}");
  }

  private void PopulateMatchTips()
  {
    Console.WriteLine("PopulateMatchTips");
    var random = new Random();
    int id = 1;
    foreach (var tipper in _db.Tippers.ToList())
    {
      Console.WriteLine($"  {tipper.Name}");
      foreach (var match in _db.MatchWithResults
        .Include(x => x.Team1)
        .Include(x => x.Team2)
        .ToList())
      {
        int shot = random.Next(0, 4);
        int received = random.Next(0, 4);
        //Console.WriteLine($"  {tipper.Name} {match.Team1.Name}-{match.Team2.Name}: {shot}:{received}");
        _db.MatchTips.Add(new MatchTip
        {
          Id = id++,
          MatchWithResult = match,
          Tipper = tipper,
          IsTip12X = false,
          IsTipExact = false,
          GoalsShot = shot,
          GoalsReceived = received
        });
      }
    }
    _db.SaveChanges();
  }

  private void PopulateTippers()
  {
    Console.WriteLine("PopulateTippers");
    //ID;Name;Gruppe
    //1;RobertG;Club97,Grueneis,SVAI,SVWSenioren
    var tippers = File.ReadAllLines(Path.Combine("csv", "tippernames.csv"))
       .Skip(1)
       .Select(x => x.Split(";"))//.Select(y => y.Trim()))
       .Select(x => new Tipper
       {
         Id = int.Parse(x[0]),
         Name = x[1].Trim(),
         TippingCategories = x[2].Trim(),
       });
    _db.AddRange(tippers);
    _db.SaveChanges();
  }

  private void PopulateMatches()
  {
    Console.WriteLine("PopulateMatches");
    // 0     1     2     3     4
    //Seq;Gruppe;Team1;Team2;Datum
    //1;A;Ita;Tur;12.06.2020
    var lines = File.ReadAllLines(Path.Combine("csv", "matches.csv"))
       .Skip(1)
       .Select(x => x.Split(";"));
    var teamNames = lines.Select(x => x[2]).Union(lines.Select(x => x[3])).ToList();
    if (!_db.Teams.Any()) PopulateTeams(teamNames);
    var teamMap = _db.Teams.ToDictionary(x => x.Name, x => x);
    int id = 1;
    var matches = lines.Select(x => new MatchWithResult
    {
      Id = id++,
      MatchNr = int.Parse(x[0]),
      GroupName = x[1].Trim(),
      Team1 = teamMap[x[2]],
      Team2 = teamMap[x[3]],
      DateOfMatch = x[4],//DateOnly.ParseExact(x[4], "dd.MM.yyyy", null),
      //Datum = new System.Text.ASCIIEncoding().GetBytes(x[4]),
    });
    _db.AddRange(matches);
    _db.SaveChanges();
  }

  private void PopulateTeams(IEnumerable<string> teamNames)
  {
    Console.WriteLine($"PopulateTeams with {teamNames.Count()} teams");
    int id = 1;
    var teams = teamNames.OrderBy(x => x)
      .Select(x => new Team
      {
        Name = x,
        ShortName = x,
        Id = id++
      });
    _db.Teams.AddRange(teams);
    _db.SaveChanges();
  }

}
