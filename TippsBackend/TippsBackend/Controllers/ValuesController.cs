namespace TippsBackend.Controllers;

public record struct OkStatus(bool IsOk, int Nr, string? Error = null);

[Route("[controller]")]
[ApiController]
public class ValuesController : ControllerBase
{	
  private readonly TipsContext _db;
  public ValuesController(TipsContext db) => _db = db;
  
  [HttpGet("Teams")]
  public OkStatus GetTeams()
  {
    this.Log();
    try
    {
  	  int nr = _db.Teams.Count();
  	  return new OkStatus(true, nr);
    }
    catch (Exception exc)
    {
  	  return new OkStatus(false, -1, exc.Message);
    }
  }
}
