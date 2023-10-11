namespace TipsDb;

public partial class MatchWithResult
{
  public long Id { get; set; }
  public string DateOfMatch { get; set; } = null!;
  public string GroupName { get; set; } = null!;
  public long MatchNr { get; set; }
  public long? GoalsShot { get; set; }
  public long? GoalsReceived { get; set; }
  public long Team1Id { get; set; }
  public long Team2Id { get; set; }
  public virtual ICollection<MatchTip> MatchTips { get; } = new List<MatchTip>();
  public virtual Team Team1 { get; set; } = null!;
  public virtual Team Team2 { get; set; } = null!;
}
