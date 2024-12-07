using EduTrailblaze.Entities;
using EduTrailblaze.Repositories.Interfaces;
using EduTrailblaze.Services.DTOs;
using EduTrailblaze.Services.Helper;
using EduTrailblaze.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace EduTrailblaze.Services
{
    public class CartService : ICartService
    {
        private readonly IRepository<Cart, int> _cartRepository;
        private readonly UserManager<User> _userManager;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ICourseService _courseService;

        public CartService(IRepository<Cart, int> cartRepository, IHttpContextAccessor httpContextAccessor, ICourseService courseService, UserManager<User> userManager)
        {
            _cartRepository = cartRepository;
            _httpContextAccessor = httpContextAccessor;
            _courseService = courseService;
            _userManager = userManager;
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

        public async Task DisableCart(int cartId)
        {
            try
            {
                var cart = await _cartRepository.GetByIdAsync(cartId);
                if (cart == null)
                {
                    throw new Exception("Cart not found.");
                }

                cart.IsActive = false;
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

        // Cookie cart
        public void RemoveCourseFromCart(int courseId, string? userId)
        {
            try
            {
                Dictionary<int, CartItemDTO> cartItems = new Dictionary<int, CartItemDTO>();
                var savedCart = _httpContextAccessor.HttpContext?.Request.Cookies[$"Cart_{userId}"] ?? string.Empty;

                if (!string.IsNullOrEmpty(savedCart))
                {
                    cartItems = CartUtil.GetCartFromCookie(savedCart);
                    cartItems.Remove(courseId);
                }

                var strItemsInCart = CartUtil.ConvertCartToString(cartItems.Values.ToList());
                CartUtil.SaveCartToCookie(_httpContextAccessor.HttpContext.Request, _httpContextAccessor.HttpContext.Response, strItemsInCart, userId);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while removing the item from the cart.", ex);
            }
        }

        public void DeleteCartInCookie(string? userId)
        {
            try
            {
                CartUtil.DeleteCartToCookie(_httpContextAccessor.HttpContext.Request, _httpContextAccessor.HttpContext.Response, userId);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while deleting the cart.", ex);
            }
        }

        public int NumberOfItemsInCart(string? userId)
        {
            try
            {
                int count = 0;
                string savedCart;
                if (string.IsNullOrEmpty(userId))
                {
                    savedCart = _httpContextAccessor.HttpContext.Request.Cookies[$"Cart"];
                }
                else
                {
                    savedCart = _httpContextAccessor.HttpContext.Request.Cookies[$"Cart_{userId}"];
                }
                if (!string.IsNullOrEmpty(savedCart))
                {
                    var cartItems = CartUtil.GetCartFromCookie(savedCart);
                    // Directly sum up the quantities from cartItems
                    count = cartItems.Count;
                }
                return count;
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error getting number of items in cart: {ex.Message}");
                return 0;
            }
        }

        public List<CartItemDTO> GetCart(string? userId)
        {
            try
            {
                string savedCart;

                savedCart = _httpContextAccessor.HttpContext.Request.Cookies[$"Cart_{userId}"];

                if (!string.IsNullOrEmpty(savedCart))
                {
                    var cart = CartUtil.GetCartFromCookie(savedCart);
                    var cartItems = cart.Values.ToList();
                    return cartItems;
                }
                return new List<CartItemDTO>();
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error getting cart: {ex.Message}");
                return new List<CartItemDTO>();
            }
        }

        public async Task SaveCartToCookie(int courseId, string? userId)
        {
            try
            {
                Dictionary<int, CartItemDTO> cartItems = new Dictionary<int, CartItemDTO>();
                CartItemDTO item = null;

                var selectedCourse = await _courseService.GetCourse(courseId);

                if (selectedCourse == null)
                {
                    throw new Exception("Course not found.");
                }

                var savedCart = _httpContextAccessor.HttpContext?.Request.Cookies[$"Cart_{userId}"] ?? string.Empty;

                if (!string.IsNullOrEmpty(savedCart))
                {
                    cartItems = CartUtil.GetCartFromCookie(savedCart);
                }

                // Check if the item exists in the cart, add or update accordingly
                if (cartItems.TryGetValue(courseId, out item))
                {
                    throw new Exception("Course already exists in the cart.");
                }

                item = new CartItemDTO
                {
                    ItemId = courseId,
                    ItemName = selectedCourse.Title,
                    //Price = selectedCourse.Price
                };
                cartItems[courseId] = item;

                // Convert the updated cart to string and save it back to the cookie
                var strItemsInCart = CartUtil.ConvertCartToString(cartItems.Values.ToList());
                CartUtil.SaveCartToCookie(_httpContextAccessor.HttpContext.Request, _httpContextAccessor.HttpContext.Response, strItemsInCart, userId);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while saving the cart to cookie: " + ex.Message);
            }
        }

        // System cart
        public async Task<Cart> GetUserCart(string userId)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(userId);
                if (user == null)
                {
                    throw new Exception("Invalid user id");
                }

                var cartDbset = await _cartRepository.GetDbSet();
                var cart = await cartDbset
                    .Include(c => c.CartItems)
                    .Where(c => c.UserId == userId && c.IsActive)
                    .OrderByDescending(c => c.UpdatedAt)
                    .FirstOrDefaultAsync();

                if (cart != null)
                {
                    return cart;
                }

                await CreateUserCart(userId);

                return await GetUserCart(userId);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the Cart: " + ex.Message);
            }
        }

        public async Task CreateUserCart(string userId)
        {
            try
            {
                var cart = new Cart
                {
                    UserId = userId,
                };
                await _cartRepository.AddAsync(cart);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while creating the Cart: " + ex.Message);
            }
        }

        public async Task RemoveItemFromCart(int courseId, string userId)
        {
            try
            {
                var cart = await GetUserCart(userId);
                var cartItem = cart.CartItems.FirstOrDefault(ci => ci.CourseId == courseId);
                if (cartItem == null)
                {
                    throw new Exception("Course not found in the cart.");
                }
                cart.CartItems.Remove(cartItem);
                await _cartRepository.UpdateAsync(cart);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while removing the course from the cart: " + ex.Message);
            }
        }

        public async Task AddItemToCart(int courseId, string userId)
        {
            try
            {
                var cart = await GetUserCart(userId);
                var cartItem = cart.CartItems.FirstOrDefault(ci => ci.CourseId == courseId);
                if (cartItem != null)
                {
                    throw new Exception("Course already exists in the cart.");
                }
                cart.CartItems.Add(new CartItem
                {
                    CourseId = courseId,
                    CartId = cart.CartId
                });
                await _cartRepository.UpdateAsync(cart);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while adding the course to the cart: " + ex.Message);
            }
        }

        public async Task<int> NumberOfItemInSystemCart(string userId)
        {
            try
            {
                var cart = await GetUserCart(userId);
                return cart.CartItems.Count;
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the number of items in the cart: " + ex.Message);
            }
        }
    }
}
