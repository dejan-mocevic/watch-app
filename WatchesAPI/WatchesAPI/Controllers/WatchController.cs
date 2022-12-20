using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WatchesAPI.Data;

namespace WatchesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WatchController : ControllerBase
    {
        private readonly DataContext _context;

        public WatchController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Watch>>> GetWatches()
        {
            return Ok(await _context.Watches.Include("WatchStyles").ToListAsync());
        }

        [HttpPost]
        public async Task<ActionResult<List<Watch>>> CreateWatch(Watch watch)
        {
            Watch wattch = new Watch();
            if (watch == null)
            {
                return BadRequest("Missing properties!");
            }
            wattch.Brand = watch.Brand;
            wattch.WatchType = watch.WatchType;
            wattch.Model = watch.Model;
            wattch.Price = watch.Price;
            //wattch.StyleId = watch.StyleId;
          
            _context.Watches.Add(wattch);
            await _context.SaveChangesAsync();

            return Ok(await _context.Watches.ToListAsync());
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<ActionResult<List<Watch>>> UpdateWatch(Watch watch, int id)
        {
            var dbWatch = await _context.Watches.FindAsync(id);
            if(dbWatch == null)
            {
                return BadRequest("Watch not found!");
            }
            dbWatch.Brand = watch.Brand;
            dbWatch.Model = watch.Model;
            dbWatch.Price = watch.Price;
            dbWatch.WatchType = watch.WatchType;
            //dbWatch.StyleId = watch.StyleId;
            //dbWatch.WatchStyle = watch.WatchStyle;
            

            await _context.SaveChangesAsync();

            return Ok(await _context.Watches.ToListAsync());
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult<List<Watch>>> DeleteWatch(int id)
        {
            var dbWatch = await _context.Watches.FindAsync(id);
            if (dbWatch == null)
            {
                return BadRequest("Watch not found!");
            }

            _context.Watches.Remove(dbWatch);
            await _context.SaveChangesAsync();

            return Ok(await _context.Watches.ToListAsync());
        }
    }
}
