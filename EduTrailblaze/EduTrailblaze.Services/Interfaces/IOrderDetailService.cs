using EduTrailblaze.Entities;
using EduTrailblaze.Services.DTOs;

namespace EduTrailblaze.Services.Interfaces
{
    public interface IOrderDetailService
    {
        Task<OrderDetail?> GetOrderDetail(int orderDetailId);

        Task<IEnumerable<OrderDetail>> GetOrderDetails();

        Task AddOrderDetail(OrderDetail orderDetail);

        Task UpdateOrderDetail(OrderDetail orderDetail);

        Task DeleteOrderDetail(OrderDetail orderDetail);

        Task AddOrderDetail(OrderDetailRequest orderDetail);
    }
}
