using EduTrailblaze.Entities;
using EduTrailblaze.Repositories.Interfaces;
using EduTrailblaze.Services.Interfaces;

namespace EduTrailblaze.Services
{
    public class CouponService : ICouponService
    {
        private readonly IRepository<Coupon, int> _couponRepository;

        public CouponService(IRepository<Coupon, int> couponRepository)
        {
            _couponRepository = couponRepository;
        }

        public async Task<Coupon?> GetCoupon(int couponId)
        {
            try
            {
                return await _couponRepository.GetByIdAsync(couponId);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the coupon.", ex);
            }
        }

        public async Task<IEnumerable<Coupon>> GetCoupons()
        {
            try
            {
                return await _couponRepository.GetAllAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the coupon.", ex);
            }
        }

        public async Task AddCoupon(Coupon coupon)
        {
            try
            {
                await _couponRepository.AddAsync(coupon);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while adding the coupon.", ex);
            }
        }

        public async Task UpdateCoupon(Coupon coupon)
        {
            try
            {
                await _couponRepository.UpdateAsync(coupon);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while updating the coupon.", ex);
            }
        }

        public async Task DeleteCoupon(Coupon coupon)
        {
            try
            {
                await _couponRepository.DeleteAsync(coupon);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while deleting the coupon.", ex);
            }
        }
    }
}
