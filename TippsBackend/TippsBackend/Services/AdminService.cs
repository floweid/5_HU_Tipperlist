namespace TippsBackend.Services;

public class AdminService
{
  private readonly TipsContext _db;

  public AdminService(TipsContext db) => _db = db;

  public MatchDto UpdateMatchResult(long id, MatchResultDto matchDto)
  {
    var match = _db.MatchWithResults.Single(x => x.Id == id);
    if (match.GoalsShot != null && match.GoalsReceived != null)
    {
      throw new InvalidOperationException($"Match #{id} already played {matchDto.GoalsShot}:{matchDto.GoalsReceived}");
    }
    match.GoalsShot = matchDto.GoalsShot;
    match.GoalsReceived = matchDto.GoalsReceived;
    _db.SaveChanges();
    //TODO: calculate Points, TipsExact and Tips12x for every Tipper
    return new MatchDto().CopyFrom(match);
  }
}
