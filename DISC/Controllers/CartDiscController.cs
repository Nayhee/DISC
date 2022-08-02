using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DISC.Models;
using DISC.Repositories;
using System.Collections.Generic;

namespace DISC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartDiscController : ControllerBase
    {
        private readonly ICartRepository _cartRepository;
        public CartDiscController(ICartRepository cartRepository)
        {
            _cartRepository = cartRepository;
        }


        // https://localhost:5001/api/cartdisc/
        [HttpPost]
        public IActionResult AddDiscToCart(CartDisc cartDisc)
        {
            _cartRepository.AddDiscToCart(cartDisc);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult RemoveDiscFromCart(int id)
        {
            _cartRepository.RemoveDiscFromCart(id);
            return NoContent();
        }



        [HttpGet("GetCartDiscId/{cartId}/{discId}")]
        public IActionResult GetCartDiscId(int cartId, int discId)
        {
            int CartDiscId = _cartRepository.GetCartDiscId(cartId, discId);
            return Ok(CartDiscId);
        }



    }
}
