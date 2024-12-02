using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EduTrailblaze.Entities
{
    public class CourseCoupon
    {
        [Key, ForeignKey("Course")]
        public int CourseId { get; set; }

        [Key, ForeignKey("Coupon")]
        public int CouponId { get; set; }


        // Navigation properties
        public virtual Course Course { get; set; }
        public virtual Coupon Coupon { get; set; }  
    }
}