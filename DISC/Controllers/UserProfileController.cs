using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DISC.Models;
using DISC.Repositories;
using System.Security.Claims;

namespace DISC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
        }

       

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserByFirebaseId(string firebaseUserId)
        {
            return Ok(_userProfileRepository.GetUserByFirebaseId(firebaseUserId));
        }

        [HttpGet("Details/{id}")]
        public IActionResult GetUserById(int id)
        {
            var userProfile = _userProfileRepository.GetUserById(id);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);
        }


        [HttpGet]
        public IActionResult GetAllUsers()
        {
            return Ok(_userProfileRepository.GetAllUsers());

        }



        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            userProfile.IsAdmin = false;
            _userProfileRepository.AddUser(userProfile);
            return CreatedAtAction(
                nameof(GetUserByFirebaseId),
                new { firebaseUserId = userProfile.FirebaseUserId },
                userProfile);
        }


        [HttpPut("Edit")]
        public ActionResult Edit(UserProfile profile)
        {
            _userProfileRepository.UpdateUser(profile);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _userProfileRepository.DeleteUser(id);
            return NoContent();
        }





        [HttpGet("DoesUserExist/{firebaseUserId}")]
        public IActionResult DoesUserExist(string firebaseUserId)
        {
            var userProfile = _userProfileRepository.GetUserByFirebaseId(firebaseUserId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpGet("GetCurrentUser")]
        public IActionResult GetLoggedInUser()
        {
            UserProfile user = GetCurrentUserProfile();
            user.FirebaseUserId = "ENCRYPTED";
            return Ok(user);
        }


        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetUserByFirebaseId(firebaseUserId);
        }

    }
}
