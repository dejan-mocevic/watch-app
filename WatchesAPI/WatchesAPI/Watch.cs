using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WatchesAPI
{
    public class Watch
    {
        [Key]
        public int Id { get; set; }
        public string WatchType { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public string Price { get; set; }
        public int WatchStyleId { get; set; }
        public WatchStyle WatchStyle { get; set; }

    }
}
