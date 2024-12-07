using EduTrailblaze.Entities;

namespace EduTrailblaze.Services.Interfaces
{
    public interface IVoucherService
    {
        Task<Voucher?> GetVoucher(int voucherId);

        Task<IEnumerable<Voucher>> GetVouchers();

        Task AddVoucher(Voucher voucher);

        Task UpdateVoucher(Voucher voucher);

        Task DeleteVoucher(Voucher voucher);
    }
}
