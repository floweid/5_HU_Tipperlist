namespace TippsBackend.Controllers;

[Route("[controller]")]
[ApiController]
public class TippsController : ControllerBase
{
  private readonly TippsService _tippsService;
  public TippsController(TippsService tipsService) => _tippsService = tipsService;

  [HttpGet("{tipperId}")]
  public TipDto Tipps(int tipperId)
  {
    this.Log($"for tipper {tipperId}");
    return _tippsService.Tipps(tipperId);
  }

}
