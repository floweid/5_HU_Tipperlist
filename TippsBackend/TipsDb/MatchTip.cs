namespace TipsDb;

public partial class MatchTip
{
  public long Id { get; set; }
  public long TipperId { get; set; }
  public long MatchWithResultId { get; set; }
  public long GoalsShot { get; set; }
  public long GoalsReceived { get; set; }
  public bool? IsTipExact { get; set; }
  public bool? IsTip12X { get; set; }
  public virtual MatchWithResult MatchWithResult { get; set; } = null!;
  public virtual Tipper Tipper { get; set; } = null!;
}
