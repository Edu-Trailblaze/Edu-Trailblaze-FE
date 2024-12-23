using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EduTrailblaze.Entities
{
    [Index(nameof(Code), IsUnique = true)]
    public class Coupon
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CouponId { get; set; }

        [Required, StringLength(50)]
        public string Code { get; set; }

        [Required, StringLength(50)]
        public string DiscountType { get; set; } //'Percentage', 'Value'

        [Required]
        [Precision(18, 3)]
        public decimal DiscountValue { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? ExpiryDate { get; set; }

        public bool IsActive { get; set; } = true;

        public int? UsageCount { get; set; }

        public int? MaxUsage { get; set; }

        // Navigation properties
        public virtual ICollection<CourseCoupon> CourseCoupons { get; set; }
    }
}