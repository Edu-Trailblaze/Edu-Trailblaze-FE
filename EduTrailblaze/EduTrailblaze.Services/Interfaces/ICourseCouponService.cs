using EduTrailblaze.Entities;

namespace EduTrailblaze.Services.Interfaces
{
    public interface ICourseCouponService
    {
        Task<CourseCoupon?> GetCourseCoupon(int courseCouponId);

        Task<IEnumerable<CourseCoupon>> GetCourseCoupons();

        Task AddCourseCoupon(CourseCoupon courseCoupon);

        Task UpdateCourseCoupon(CourseCoupon courseCoupon);

        Task DeleteCourseCoupon(CourseCoupon courseCoupon);
    }
}
