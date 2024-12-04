using EduTrailblaze.Repositories.Interfaces;
using EduTrailblaze.Entities;
using EduTrailblaze.Services.Interfaces;

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
    }
}
