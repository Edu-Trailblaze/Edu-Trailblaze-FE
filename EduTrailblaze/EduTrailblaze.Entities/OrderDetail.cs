using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EduTrailblaze.Entities
{
    public class OrderDetail
    {
        [Key, ForeignKey("Order")]
        public int OrderId { get; set; }

        [Key, ForeignKey("Course")]
        public int CourseId { get; set; }

        [Required]
        public decimal Price { get; set; }


        // Navigation properties
        public virtual Order Order { get; set; }
        public virtual Course Course { get; set; }
    }
}