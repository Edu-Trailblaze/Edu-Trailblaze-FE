using EduTrailblaze.Entities;
using EduTrailblaze.Repositories.Interfaces;
using EduTrailblaze.Services.Interfaces;

namespace EduTrailblaze.Services
{
    public class CartService : ICartService
    {
        private readonly IRepository<Cart, int> _cartRepository;

        public CartService(IRepository<Cart, int> cartRepository)
        {
            _cartRepository = cartRepository;
        }

        public async Task<Cart?> GetCart(int cartId)
        {
            try
            {
                return await _cartRepository.GetByIdAsync(cartId);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the Cart.", ex);
            }
        }

        public async Task<IEnumerable<Cart>> GetCarts()
        {
            try
            {
                return await _cartRepository.GetAllAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the Cart.", ex);
            }
        }

        public async Task AddCart(Cart cart)
        {
            try
            {
                await _cartRepository.AddAsync(cart);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while adding the Cart.", ex);
            }
        }

        public async Task UpdateCart(Cart cart)
        {
            try
            {
                await _cartRepository.UpdateAsync(cart);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while updating the Cart.", ex);
            }
        }

        public async Task DeleteCart(Cart cart)
        {
            try
            {
                await _cartRepository.DeleteAsync(cart);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while deleting the Cart.", ex);
            }
        }
    }
}
