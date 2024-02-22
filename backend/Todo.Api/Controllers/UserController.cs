using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Todo.Api.Models;
using Todo.Api.Data;
using System;
using System.IO;
using System.Threading.Tasks;

namespace Todo.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly TodoDbContext _userDbContext;
        public UserController(TodoDbContext userDbContext)
        {
            _userDbContext = userDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            Console.WriteLine("USERDBCONTEXT!!!!!", _userDbContext, "\n");
            if (_userDbContext == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error");
            }
            try
            {
                var users = await _userDbContext.Users.ToListAsync();
                return Ok(users);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GetAll Users: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error");
            }
        }
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromForm] User user, [FromForm] IFormFile image)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                user.Id = Guid.NewGuid();

                if (image != null && image.Length > 0)
                {
                    user.Image = ConvertImageToByteArray(image);
                }

                _userDbContext.Users.Add(user);
                await _userDbContext.SaveChangesAsync();

                return Ok(user);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in CreateUser: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error");
            }
        }



        private byte[] ConvertImageToByteArray(IFormFile image)
        {
            using (MemoryStream ms = new MemoryStream())
            {
                image.CopyTo(ms);
                return ms.ToArray();
            }
        }

        [HttpPost("login")]
        public IActionResult LoginUser([FromBody] UserLogin userData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var user = _userDbContext.Users
                    .FirstOrDefault(t => t.Email == userData.Email && t.Password == userData.Password);

                if (user != null)
                {
                    // Convert the original byte[] image to Base64 string
                    var base64String = Convert.ToBase64String(user.Image);

                    // Create a new property to hold the Base64-encoded image data
                    var imageData = new { Base64Image = base64String };

                    // Return the original user data along with the Base64-encoded image data
                    return Ok(new { Message = "Login successful", User = user, ImageData = imageData });
                }
                else
                {
                    // Login failed
                    return BadRequest(new { Message = "Invalid credentials" });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in LoginUser: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error");
            }
        }
        [HttpGet("{id:Guid}")]
        public IActionResult GetUser([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                Console.WriteLine("Invalid model state.");
                return BadRequest(ModelState);
            }

            try
            {
                var user = _userDbContext.Users.FirstOrDefault(t => t.Id == id);

                if (user == null)
                {
                    return NotFound(); // Return 404 if user with the specified ID is not found
                }

                return Ok(user);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GetUser: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error");
            }
        }


    }

}