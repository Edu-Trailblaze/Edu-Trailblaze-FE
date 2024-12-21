using EduTrailblaze.Entities;
using EduTrailblaze.Repositories.Interfaces;
using EduTrailblaze.Services.Interfaces;

namespace EduTrailblaze.Services
{
    public class UserCourseCouponService : IUserCourseCouponService
    {
        private readonly IRepository<UserCourseCoupon, int> _userCourseCouponRepository;

        public UserCourseCouponService(IRepository<UserCourseCoupon, int> userCourseCouponRepository)
        {
            _userCourseCouponRepository = userCourseCouponRepository;
        }

        public async Task<IEnumerable<UserCourseCoupon>> GetAllUserCourseCouponsAsync()
        {
            try
            {
                return await _userCourseCouponRepository.GetAllAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"Couldn't retrieve user course coupons: {ex.Message}");
            }
        }

        public async Task<UserCourseCoupon?> GetUserCourseCouponByIdAsync(int id)
        {
            try
            {
                return await _userCourseCouponRepository.GetByIdAsync(id);
            }
            catch (Exception ex)
            {
                throw new Exception($"Couldn't retrieve user course coupon: {ex.Message}");
            }
        }

        public async Task AddUserCourseCouponAsync(UserCourseCoupon userCourseCoupon)
        {
            try
            {
                await _userCourseCouponRepository.AddAsync(userCourseCoupon);
            }
            catch (Exception ex)
            {
                throw new Exception($"Couldn't add user course coupon: {ex.Message}");
            }
        }

        public async Task UpdateUserCourseCouponAsync(UserCourseCoupon userCourseCoupon)
        {
            try
            {
                await _userCourseCouponRepository.UpdateAsync(userCourseCoupon);
            }
            catch (Exception ex)
            {
                throw new Exception($"Couldn't update user course coupon: {ex.Message}");
            }
        }

        public async Task DeleteUserCourseCouponAsync(UserCourseCoupon userCourseCoupon)
        {
            try
            {
                await _userCourseCouponRepository.DeleteAsync(userCourseCoupon);
            }
            catch (Exception ex)
            {
                throw new Exception($"Couldn't delete user course coupon: {ex.Message}");
            }
        }
    }
}
