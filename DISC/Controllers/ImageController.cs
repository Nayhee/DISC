using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DISC.Models;
using DISC.Repositories;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace DISC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly IImageRepository _imageRepository;

        public ImageController(IImageRepository imageRepository)        {
            _imageRepository = imageRepository;
        }


        [HttpGet("{Id}")]
        public ActionResult GetImageById(int Id)
        {
            var stream = _imageRepository.GetImageStreamById(Id);
            if (stream != null)
            {
                return File(stream, "image/png", $"image_{Id}.png"); //will eventually adjust for more than just PNG's.
            }
            return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromForm] IFormFile data)
        {   
            Image image = new();
            image.Body = data;
            string[] words = data.FileName.Split('.');
            image.Name = words[0];
         

            using (var memoryStream = new MemoryStream())
            {
                await image.Body.CopyToAsync(memoryStream);

                image.Id = _imageRepository.CreateImage(memoryStream.ToArray(), image.Name);

            }
            return CreatedAtAction(nameof(GetImageById), new { Id = image.Id }, image);
        }

    }
}
