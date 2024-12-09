using EduTrailblaze.Entities;
using EduTrailblaze.Repositories.Interfaces;
using EduTrailblaze.Services.DTOs;
using EduTrailblaze.Services.Interfaces;

namespace EduTrailblaze.Services
{
    public class OrderService : IOrderService
    {
        private readonly IRepository<Order, int> _orderRepository;
        private readonly IMailService _mailService;
        private readonly IPaymentService _paymentService;
        private readonly ICartService _cartService;

        public OrderService(IRepository<Order, int> orderRepository, IPaymentService paymentService, ICartService cartService)
        {
            _orderRepository = orderRepository;
            _paymentService = paymentService;
            _cartService = cartService;
        }

        public async Task<Order?> GetOrder(int orderId)
        {
            try
            {
                return await _orderRepository.GetByIdAsync(orderId);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the order.", ex);
            }
        }

        public async Task<IEnumerable<Order>> GetOrders()
        {
            try
            {
                return await _orderRepository.GetAllAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the order.", ex);
            }
        }

        public async Task AddOrder(Order order)
        {
            try
            {
                await _orderRepository.AddAsync(order);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while adding the order.", ex);
            }
        }

        public async Task AddOrder(CreateOrderRequest order)
        {
            try
            {
                var newOrder = new Order
                {
                    UserId = order.UserId,
                    OrderAmount = order.OrderAmount,
                };
                await _orderRepository.AddAsync(newOrder);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while adding the order.", ex);
            }
        }

        public async Task UpdateOrder(Order order)
        {
            try
            {
                await _orderRepository.UpdateAsync(order);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while updating the order.", ex);
            }
        }

        public async Task UpdateOrder(UpdateOrderRequest order)
        {
            try
            {
                var existingCourse = await _orderRepository.GetByIdAsync(order.OrderId);
                if (existingCourse == null)
                {
                    throw new Exception("Course not found.");
                }
                existingCourse.OrderStatus = order.OrderStatus;
                await _orderRepository.UpdateAsync(existingCourse);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while updating the order.", ex);
            }
        }

        public async Task DeleteOrder(Order order)
        {
            try
            {
                await _orderRepository.DeleteAsync(order);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while deleting the order.", ex);
            }
        }

        public async Task OrderProcessing(CreateOrderRequest createOrderRequest)
        {
            try
            {
                var cart = await _cartService.GetSystemCart(createOrderRequest.UserId);

            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while updating the order: " + ex.Message);
            }
        }

        public async Task PaymentProcessing(Payment payment)
        {
            try
            {

            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while processing the payment: " + ex.Message);
            }
        }

        public async Task AutomaticFailedOrder(int orderId)
        {
            try
            {
                var order = await GetOrder(orderId);

                if (order == null)
                {
                    throw new Exception("Order not found.");
                }

                if (order.OrderStatus == "Pending")
                {
                    order.OrderStatus = "Failed";
                    await UpdateOrder(order);
                }
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while automatically failing the order.", ex);
            }
        }

        public async Task CancelOrder(int orderId)
        {
            try
            {
                var order = await _orderRepository.GetByIdAsync(orderId);

                if (order == null)
                {
                    throw new Exception("Order not found.");
                }
                order.OrderStatus = "Cancelled";

                await UpdateOrder(order);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while canceling the order.", ex);
            }
        }
    }
}
