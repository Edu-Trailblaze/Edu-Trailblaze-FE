using EduTrailblaze.Entities;

namespace EduTrailblaze.Services.Interfaces
{
    public interface IUserCourseCouponService
    {
        Task<IEnumerable<UserCourseCoupon>> GetAllUserCourseCouponsAsync();

        Task<UserCourseCoupon?> GetUserCourseCouponByIdAsync(int id);

        Task AddUserCourseCouponAsync(UserCourseCoupon userCourseCoupon);

        Task UpdateUserCourseCouponAsync(UserCourseCoupon userCourseCoupon);

        Task DeleteUserCourseCouponAsync(UserCourseCoupon userCourseCoupon);
    }
}
