using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EduTrailblaze.Entities
{
    public class Discount
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int DiscountId { get; set; }

        [Required, StringLength(50)]
        public string DiscountType { get; set; } //'Percentage', 'Value'

        [Required]
        public decimal DiscountValue { get; set; }

        public DateTime StartDate { get; set; } = DateTime.UtcNow;

        [Required]
        public DateTime EndDate { get; set; }

        public bool IsActive { get; set; } = true;


        // Navigation properties
        public virtual ICollection<CourseDiscount> CourseDiscounts { get; set; }
    }
}
