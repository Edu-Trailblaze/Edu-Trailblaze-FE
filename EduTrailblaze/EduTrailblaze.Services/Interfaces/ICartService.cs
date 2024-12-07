using EduTrailblaze.Entities;
using EduTrailblaze.Services.DTOs;

namespace EduTrailblaze.Services.Interfaces
{
    public interface ICartService
    {
        Task<Cart?> GetCart(int cartId);

        Task<IEnumerable<Cart>> GetCarts();

        Task AddCart(Cart cart);

        Task UpdateCart(Cart cart);

        Task DeleteCart(Cart cart);

        Task DisableCart(int cartId);

        void RemoveCourseFromCart(int courseId, string? userId);

        void DeleteCartInCookie(string? userId);

        int NumberOfItemsInCart(string? userId);

        List<CartItemDTO> GetCart(string? userId);

        Task SaveCartToCookie(int courseId, string? userId);

        Task<Cart> GetUserCart(string userId);

        Task CreateUserCart(string userId);

        Task RemoveItemFromCart(int courseId, string userId);

        Task AddItemToCart(int courseId, string userId);

        Task<int> NumberOfItemInSystemCart(string userId);
    }
}