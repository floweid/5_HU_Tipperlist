namespace TippsBackend.Dtos;

public class SingleTipDto
{
  [Required] public long MatchWithResultId { get; set; }
  [Required] public long MatchNr { get; set; }
  [Required] public long GoalsShot { get; set; }
  [Required] public long GoalsReceived { get; set; }
  public bool? IsTipExact { get; set; }
  public bool? IsTip12X { get; set; }
}
