using System.ComponentModel.DataAnnotations;

namespace WatchesAPI
{
    public class UserDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

    }
}
