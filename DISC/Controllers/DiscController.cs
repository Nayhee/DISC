using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DISC.Models;
using DISC.Repositories;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;

namespace DISC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiscController : ControllerBase
    {
        private readonly IDiscRepository _discRepository;
        private readonly IImageRepository _imageRepository;
        public DiscController(IDiscRepository discRepository, IImageRepository imageRepository)
        {
            _discRepository = discRepository;
            _imageRepository = imageRepository;
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

        [HttpPut("UpdateOrderDiscs")]
        public IActionResult UpdateOrderDiscs(List<Disc> discList)
        {
            foreach (Disc disc in discList)
            {
                disc.ForSale = false;
                _discRepository.UpdateDisc(disc);
            }
            return NoContent();
        }

        // https://localhost:5001/api/disc/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _discRepository.DeleteDisc(id);
            return NoContent();
        }


        [HttpGet("SearchByName")]
        public IActionResult SearchDiscByName(string query)
        {
            return Ok(_discRepository.SearchDiscByName(query));
        }

        [HttpGet("GetBrands")]
        public IActionResult GetBrands()
        {
            return Ok(_discRepository.GetAllBrands());
        }


        //public ActionResult Image(int id)
        //{
        //    var stream = _imageRepository.GetImageStreamById(id);
        //    if (stream != null)
        //    {
        //        return File(stream, "image/png", $"image_{id}.jpg");
        //    }

        //    return NotFound();
        //}
    }
}
