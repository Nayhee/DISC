using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DISC.Models;
using DISC.Repositories;
using Microsoft.AspNetCore.Authorization;
using System;
using DISC.Controllers;

namespace DISC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartRepository _cartRepository;
        public CartController(ICartRepository cartRepository)
        {
            _cartRepository = cartRepository;
        }

        [HttpPost]
        public IActionResult Post(Cart cart)
        {
            Console.WriteLine(cart);
            cart.DateCreated = DateTime.Now;
            _cartRepository.AddCart(cart);
            return CreatedAtAction("Get", new { id = cart.Id }, cart);
        }

        [HttpGet("{userId}")]
        public IActionResult GetUsersCurrentCart(int userId)
        {
            var Cart = _cartRepository.GetUsersCurrentCart(userId);
            if(Cart == null || Cart.UserProfileId != userId)
            {
                return NotFound();
            }
            return Ok(Cart);
        }
    }
}
