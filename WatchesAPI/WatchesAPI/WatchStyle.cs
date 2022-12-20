using System.ComponentModel.DataAnnotations;

namespace WatchesAPI
{
    public class WatchStyle
    {
        [Key]
        public int Id { get; set; }
        public string StyleName { get; set; }

        //public List<Watch> Watches { get; set; }
    }
}
