namespace TippsBackend.Services;

public class TippsService
{
  private readonly TipsContext _db;

  public TippsService(TipsContext db) => _db = db;

  public List<TipperDto> GetAllTippers()
  {
    return _db.Tippers
      .OrderBy(x => x.Name)
      .Select(x => new TipperDto().CopyFrom(x))
      .ToList();
  }

  public List<MatchDto> GetAllMatches()
  {
    return _db.MatchWithResults
      .Include(x => x.Team1)
      .Include(x => x.Team2)
      .ToList()
      .Select(x =>
      {
        var dto = new MatchDto
        {
          Team1Name = x.Team1!.Name,
          Team2Name = x.Team2!.Name,
        }.CopyFrom(x);
        return dto;
      })
      .ToList();
  }

  public TipDto Tipps(int tipperId)
  {
    var tipper = _db.Tippers.Single(x => x.Id == tipperId);
    var tippDto = new TipDto
    {
      TipperName = tipper.Name,
      TipperId = tipper.Id,
      Tips = _db.MatchTips
      .Include(x => x.MatchWithResult)
      .Where(x => x.Tipper.Id == tipperId)
      .ToList()
      .Select(x =>
      {
        var dto = new SingleTipDto().CopyFrom(x);
        dto.MatchNr = x.MatchWithResult.MatchNr;
        return dto;
      }).ToList()
    }.CopyFrom(tipper);
    return tippDto;
  }


}
