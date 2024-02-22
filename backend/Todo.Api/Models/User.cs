using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
namespace Todo.Api.Models
{
    public class User
    {
        [Key]
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Username { get; set; }
        public byte[]? Image { get; set; }
        public string? token { get; set; }
    }
}