using EduTrailblaze.Entities;
using EduTrailblaze.Repositories.Interfaces;
using EduTrailblaze.Services.DTOs;
using EduTrailblaze.Services.Helper;
using EduTrailblaze.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EduTrailblaze.Services
{
    public class VoucherService : IVoucherService
    {
        private readonly IRepository<Voucher, int> _voucherRepository;

        public VoucherService(IRepository<Voucher, int> voucherRepository)
        {
            _voucherRepository = voucherRepository;
        }

        public async Task<Voucher?> GetVoucher(int voucherId)
        {
            try
            {
                return await _voucherRepository.GetByIdAsync(voucherId);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the voucher.", ex);
            }
        }

        public async Task<IEnumerable<Voucher>> GetVouchers()
        {
            try
            {
                return await _voucherRepository.GetAllAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the voucher.", ex);
            }
        }

        public async Task AddVoucher(Voucher voucher)
        {
            try
            {
                await _voucherRepository.AddAsync(voucher);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while adding the voucher.", ex);
            }
        }

        public async Task UpdateVoucher(Voucher voucher)
        {
            try
            {
                await _voucherRepository.UpdateAsync(voucher);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while updating the voucher.", ex);
            }
        }

        public async Task AddVoucher(CreateVoucherRequest voucher)
        {
            try
            {
                var newVoucher = new Voucher
                {
                    VoucherCode = voucher.VoucherCode,
                    DiscountType = voucher.DiscountType,
                    DiscountValue = voucher.DiscountValue,
                    ExpiryDate = voucher.ExpiryDate
                };
                await _voucherRepository.AddAsync(newVoucher);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while adding the voucher.", ex);
            }
        }

        public async Task UpdateVoucher(UpdateVoucherRequest voucher)
        {
            try
            {
                var voucherToUpdate = await _voucherRepository.GetByIdAsync(voucher.VoucherId);
                if (voucherToUpdate == null)
                {
                    throw new Exception("Voucher not found.");
                }
                voucherToUpdate.VoucherCode = voucher.VoucherCode;
                voucherToUpdate.DiscountType = voucher.DiscountType;
                voucherToUpdate.DiscountValue = voucher.DiscountValue;
                voucherToUpdate.ExpiryDate = voucher.ExpiryDate;
                voucherToUpdate.IsUsed = voucher.IsUsed;

                await _voucherRepository.UpdateAsync(voucherToUpdate);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while updating the voucher.", ex);
            }
        }

        public async Task DeleteVoucher(Voucher voucher)
        {
            try
            {
                await _voucherRepository.DeleteAsync(voucher);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while deleting the voucher.", ex);
            }
        }

        public async Task<Voucher?> CheckVoucherValidity(string voucherCode, decimal orderPrice)
        {
            try
            {
                var voucherDbSet = await _voucherRepository.GetDbSet();
                var voucher = await voucherDbSet.FirstOrDefaultAsync(v => v.ExpiryDate < DateTimeHelper.GetVietnamTime() && v.VoucherCode == voucherCode && v.IsUsed);

                if (voucher == null)
                {
                    return null;
                }
                if (voucher.MinimumOrderValue.HasValue && orderPrice < voucher.MinimumOrderValue)
                {
                    return null;
                }
                if (voucher.OrderId.HasValue)
                {
                    return null;
                }
                return voucher;
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while checking the voucher validity.", ex);
            }
        }
    }
}
