namespace TippsBackend.Dtos;

public class TipDto
{
  [Required] public long TipperId { get; set; }
  [Required] public string TipperName { get; set; } = null!;
  [Required] public long Points { get; set; }
  [Required] public long NrTipsExact { get; set; }
  [Required] public long NrTips12X { get; set; }
  [Required] public List<SingleTipDto> Tips { get; set; } = new();
}
