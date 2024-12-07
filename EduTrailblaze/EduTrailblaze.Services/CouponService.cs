using EduTrailblaze.Entities;
using EduTrailblaze.Repositories.Interfaces;
using EduTrailblaze.Services.DTOs;
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

        public async Task AddCoupon(CreateCouponRequest coupon)
        {
            try
            {
                var newCoupon = new Coupon
                {
                    Code = coupon.Code,
                    DiscountType = coupon.DiscountType,
                    DiscountValue = coupon.DiscountValue,
                    ExpiryDate = coupon.ExpiryDate,
                };
                await _couponRepository.AddAsync(newCoupon);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while adding the coupon.", ex);
            }
        }

        public async Task UpdateCoupon(UpdateCouponRequest coupon)
        {
            try
            {
                var existingCoupon = await _couponRepository.GetByIdAsync(coupon.CouponId);
                if (existingCoupon == null)
                {
                    throw new Exception("Coupon not found.");
                }
                existingCoupon.Code = coupon.Code;
                existingCoupon.DiscountType = coupon.DiscountType;
                existingCoupon.DiscountValue = coupon.DiscountValue;
                existingCoupon.ExpiryDate = coupon.ExpiryDate;
                existingCoupon.IsActive = coupon.IsActive;

                await _couponRepository.UpdateAsync(existingCoupon);
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
