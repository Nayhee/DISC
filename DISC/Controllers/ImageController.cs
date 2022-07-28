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


        [HttpGet("{ImageId}")]
        public ActionResult Image(int ImageId)
        {
            var stream = _imageRepository.GetImageStreamById(ImageId);
            if (stream != null)
            {
                return File(stream, "image/png", $"image_{ImageId}.png");
            }
            return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromForm] IFormFile data)
        {
            Image image = new Image();
            image.Body = data;
            using (var memoryStream = new MemoryStream())
            {
                await image.Body.CopyToAsync(memoryStream);

                image.Id = _imageRepository.CreateImage(memoryStream.ToArray());

            }
            return Accepted(image);
        }

    }
}
