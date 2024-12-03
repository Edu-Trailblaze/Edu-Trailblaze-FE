using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EduTrailblaze.Entities
{
    [Index(nameof(DiscountId), nameof(CourseId), IsUnique = true)]
    public class CourseDiscount
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CourseDiscountId { get; set; }

        [ForeignKey("Course")]
        public int CourseId { get; set; }

        [ForeignKey("Discount")]
        public int DiscountId { get; set; }


        // Navigation properties
        public virtual Course Course { get; set; }
        public virtual Discount Discount { get; set; }
    }
}
