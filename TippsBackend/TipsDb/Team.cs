namespace TipsDb;

public partial class Team
{
  public long Id { get; set; }
  public string Name { get; set; } = null!;
  public string ShortName { get; set; } = null!;
  public virtual ICollection<MatchWithResult> MatchWithResultTeam1s { get; } = new List<MatchWithResult>();
  public virtual ICollection<MatchWithResult> MatchWithResultTeam2s { get; } = new List<MatchWithResult>();
}
