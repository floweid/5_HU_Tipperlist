namespace TippsBackend.Dtos;

public class MatchResultDto
{
  [Required] public int GoalsShot { get; set; }
  [Required] public int GoalsReceived { get; set; }
}
