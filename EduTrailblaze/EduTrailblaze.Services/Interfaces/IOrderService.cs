using EduTrailblaze.Entities;

namespace EduTrailblaze.Services.Interfaces
{
    public interface IOrderService
    {
        Task<Order?> GetOrder(int orderId);

        Task<IEnumerable<Order>> GetOrders();

        Task AddOrder(Order order);

        Task UpdateOrder(Order order);

        Task DeleteOrder(Order order);

        Task AutomaticFailedOrder(int orderId);
    }
}
