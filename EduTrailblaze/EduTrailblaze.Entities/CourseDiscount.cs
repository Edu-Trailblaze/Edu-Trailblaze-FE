using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EduTrailblaze.Entities
{
    public class CourseDiscount
    {
        [Key, ForeignKey("Course")]
        public int CourseId { get; set; }

        [Key, ForeignKey("Discount")]
        public int DiscountId { get; set; }


        // Navigation properties
        public virtual Course Course { get; set; }
        public virtual Discount Discount { get; set; }
    }
}
