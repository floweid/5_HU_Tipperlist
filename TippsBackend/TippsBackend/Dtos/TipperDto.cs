namespace TippsBackend.Dtos;

public class TipperDto
{
  [Required] public long Id { get; set; }
  [Required] public string Name { get; set; } = null!;
  [JsonIgnore] public string TippingCategories { get; set; } = null!;
  [Required]
  public List<string> TippingCategoryNames => TippingCategories
    .Split(",")
    .Select(x => x.Trim())
    .Order()
    .ToList();
}
