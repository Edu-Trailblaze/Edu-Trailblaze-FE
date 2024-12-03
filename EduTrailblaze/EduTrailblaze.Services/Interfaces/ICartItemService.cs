using EduTrailblaze.Entities;

namespace EduTrailblaze.Services.Interfaces
{
    public interface ICartItemService
    {
        Task<CartItem?> GetCartItem(int cartItemId);

        Task<IEnumerable<CartItem>> GetCartItems();

        Task AddCartItem(CartItem cartItem);

        Task UpdateCartItem(CartItem cartItem);

        Task DeleteCartItem(CartItem cartItem);
    }
}
