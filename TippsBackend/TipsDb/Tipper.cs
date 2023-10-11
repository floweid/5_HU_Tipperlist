namespace TipsDb;

public partial class Tipper
{
  public long Id { get; set; }
  public string Name { get; set; } = null!;
  public string TippingCategories { get; set; } = null!;
  public long Points { get; set; }
  public long NrTipsExact { get; set; }
  public long NrTips12X { get; set; }
  public virtual ICollection<MatchTip> MatchTips { get; } = new List<MatchTip>();
}
