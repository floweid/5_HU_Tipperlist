namespace TippsBackend.Dtos;

public class MatchDto
{
  [Required] public long Id { get; set; }
  //[JsonIgnore] public DateOnly DateOfMatch { private get; set; }
  //[Required] public string DateString => $"{DateOfMatch:dd.MM.yyyy}";
  [JsonIgnore] public string DateOfMatch { private get; set; } = null!;
  [Required] public string DateString => DateOfMatch;
  [Required] public string GroupName { get; set; } = null!;
  [Required] public long MatchNr { get; set; }
  [Required] public long? GoalsShot { get; set; }
  [Required] public long? GoalsReceived { get; set; }
  [Required] public long Team1Id { get; set; }
  [Required] public long Team2Id { get; set; }
  [Required] public string Team1Name { get; set; } = null!;
  [Required] public string Team2Name { get; set; } = null!;
}
