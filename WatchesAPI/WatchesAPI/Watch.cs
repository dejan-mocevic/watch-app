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
        //[ForeignKey("Id")]
        //public int StyleId { get; set; }
        [ForeignKey("Id")]
        public virtual WatchStyle WatchStyle { get; set; }

    }
}
