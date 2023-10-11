namespace TippsBackend.Controllers;

[Route("[controller]")]
[ApiController]
public class TippersController : ControllerBase
{
  private readonly TippsService _tippsService;
  public TippersController(TippsService tipsService) => _tippsService = tipsService;

  [HttpGet]
  public List<TipperDto> TipperNames()
  {
    this.Log();
    return _tippsService.GetAllTippers();
  }

}
