using EduTrailblaze.Entities;
using EduTrailblaze.Repositories.Interfaces;
using EduTrailblaze.Services.Interfaces;

namespace EduTrailblaze.Services
{
    public class DiscountService : IDiscountService
    {
        private readonly IRepository<Discount, int> _dscountRepository;

        public DiscountService(IRepository<Discount, int> dscountRepository)
        {
            _dscountRepository = dscountRepository;
        }

        public async Task<Discount?> GetDiscount(int dscountId)
        {
            try
            {
                return await _dscountRepository.GetByIdAsync(dscountId);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the dscount.", ex);
            }
        }

        public async Task<IEnumerable<Discount>> GetDiscounts()
        {
            try
            {
                return await _dscountRepository.GetAllAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the dscount.", ex);
            }
        }

        public async Task AddDiscount(Discount dscount)
        {
            try
            {
                await _dscountRepository.AddAsync(dscount);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while adding the dscount.", ex);
            }
        }

        public async Task UpdateDiscount(Discount dscount)
        {
            try
            {
                await _dscountRepository.UpdateAsync(dscount);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while updating the dscount.", ex);
            }
        }

        public async Task DeleteDiscount(Discount dscount)
        {
            try
            {
                await _dscountRepository.DeleteAsync(dscount);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while deleting the dscount.", ex);
            }
        }
    }
}
