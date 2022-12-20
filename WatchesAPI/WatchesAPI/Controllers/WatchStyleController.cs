using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WatchesAPI.Data;

namespace WatchesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WatchStyleController : ControllerBase
    {
        private readonly DataContext _context;

        public WatchStyleController(DataContext context)
        {
           _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<WatchStyle>>> GetWatchStyles()
        {
            var watchStyles = await _context.WatchStyles.ToListAsync();
            return Ok(watchStyles);
        }
    }
}
