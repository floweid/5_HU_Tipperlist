namespace TippsBackend.Controllers;

[Route("[controller]")]
[ApiController]
public class MatchesController : ControllerBase
{
  private readonly TippsService _tippsService;
  private readonly AdminService _adminService;
  public MatchesController(TippsService tipsService, AdminService adminService)
  {
    _tippsService = tipsService;
    _adminService = adminService;
  }

  [HttpGet]
  public List<MatchDto> MatchResults()
  {
    this.Log();
    return _tippsService.GetAllMatches();
  }

  [HttpPut("{id}")]
  public ActionResult<MatchDto> SetMatchResult(int id, [FromBody] MatchResultDto matchDto)
  {
    this.Log($"PUT#{id} --> {matchDto.GoalsShot}:{matchDto.GoalsReceived}");
    try
    {
      return Ok(_adminService.UpdateMatchResult(id, matchDto));
    }
    catch (Exception exc)
    {
      return BadRequest(exc.Message);
    }
  }
}
