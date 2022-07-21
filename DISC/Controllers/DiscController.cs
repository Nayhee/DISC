using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DISC.Models;
using DISC.Repositories;
using Microsoft.AspNetCore.Authorization;

namespace DISC.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DiscController : ControllerBase
    {
        private readonly IDiscRepository _discRepository;
        public DiscController(IDiscRepository discRepository)
        {
            _discRepository = discRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_discRepository.GetAllDiscsForSale());
        }

        // https://localhost:5001/api/disc/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var disc = _discRepository.GetDiscById(id);
            if (disc == null)
            {
                return NotFound();
            }
            return Ok(disc);
        }

        // https://localhost:5001/api/disc/
        [HttpPost]
        public IActionResult Post(Disc disc)
        {
            _discRepository.AddDisc(disc);
            return CreatedAtAction("Get", new { id = disc.Id }, disc);
        }

        // https://localhost:5001/api/disc/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Disc disc)
        {
            if (id != disc.Id)
            {
                return BadRequest();
            }

            _discRepository.UpdateDisc(disc);
            return NoContent();
        }

        // https://localhost:5001/api/disc/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _discRepository.DeleteDisc(id);
            return NoContent();
        }

        [HttpGet("GetBrands")]
        public IActionResult GetBrands()
        {
            return Ok(_discRepository.GetAllBrands());
        }
    }
}
