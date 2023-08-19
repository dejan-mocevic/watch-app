using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
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
        //WE CAN ONLY SE THE LIST OF WATCHES IF WE AREN'T LOGGED IN
        public async Task<ActionResult<List<Watch>>> GetWatches()
        {
            await _context.Watches.Include("WatchStyle").ToListAsync();
            return Ok(await _context.Watches.ToListAsync());
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //WE NEED TO LOG IN TO ADD NEW WATCHES
        //WE NEED AUTH HEADER IN FRONTEND
        public async Task<ActionResult<List<Watch>>> CreateWatch(Watch watch)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            HttpContext.Response.Headers.Add("Authorization", $"Bearer {token}");
            Watch wattch = new Watch();
            if (watch == null)
            {
                return BadRequest("Missing properties!");
            }
            wattch.Brand = watch.Brand;
            wattch.WatchType = watch.WatchType;
            wattch.Model = watch.Model;
            wattch.Price = watch.Price;
            wattch.WatchStyleId = watch.WatchStyleId;
          
            _context.Watches.Add(wattch);
            await _context.SaveChangesAsync();

            

            return Ok(await _context.Watches.ToListAsync());
        }


        [HttpPut]
        [Route("{id}")]
        [Authorize]
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
            dbWatch.WatchStyleId = watch.WatchStyleId;
            

            await _context.SaveChangesAsync();

            return Ok(await _context.Watches.ToListAsync());
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize]
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
