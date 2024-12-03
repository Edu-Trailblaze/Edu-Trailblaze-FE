using EduTrailblaze.Entities;

namespace EduTrailblaze.Services.Interfaces
{
    public interface ICartService
    {
        Task<Cart?> GetCart(int cartId);

        Task<IEnumerable<Cart>> GetCarts();

        Task AddCart(Cart cart);

        Task UpdateCart(Cart cart);

        Task DeleteCart(Cart cart);
    }
}