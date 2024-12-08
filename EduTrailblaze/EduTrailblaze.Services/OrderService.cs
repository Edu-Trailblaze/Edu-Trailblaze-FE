using EduTrailblaze.Entities;
using EduTrailblaze.Repositories.Interfaces;
using EduTrailblaze.Services.DTOs;
using EduTrailblaze.Services.Interfaces;

namespace EduTrailblaze.Services
{
    public class OrderService : IOrderService
    {
        private readonly IRepository<Order, int> _courseRepository;

        public OrderService(IRepository<Order, int> courseRepository)
        {
            _courseRepository = courseRepository;
        }

        public async Task<Order?> GetOrder(int courseId)
        {
            try
            {
                return await _courseRepository.GetByIdAsync(courseId);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the course.", ex);
            }
        }

        public async Task<IEnumerable<Order>> GetOrders()
        {
            try
            {
                return await _courseRepository.GetAllAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the course.", ex);
            }
        }

        public async Task AddOrder(Order course)
        {
            try
            {
                await _courseRepository.AddAsync(course);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while adding the course.", ex);
            }
        }

        public async Task AddOrder(CreateOrderRequest course)
        {
            try
            {
                var newCourse = new Order
                {
                    UserId = course.UserId,
                    OrderAmount = course.OrderAmount,
                };
                await _courseRepository.AddAsync(newCourse);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while adding the course.", ex);
            }
        }

        public async Task UpdateOrder(Order course)
        {
            try
            {
                await _courseRepository.UpdateAsync(course);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while updating the course.", ex);
            }
        }

        public async Task UpdateOrder(UpdateOrderRequest course)
        {
            try
            {
                var existingCourse = await _courseRepository.GetByIdAsync(course.OrderId);
                if (existingCourse == null)
                {
                    throw new Exception("Course not found.");
                }
                existingCourse.OrderStatus = course.OrderStatus;
                await _courseRepository.UpdateAsync(existingCourse);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while updating the course.", ex);
            }
        }

        public async Task DeleteOrder(Order course)
        {
            try
            {
                await _courseRepository.DeleteAsync(course);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while deleting the course.", ex);
            }
        }
    }
}
