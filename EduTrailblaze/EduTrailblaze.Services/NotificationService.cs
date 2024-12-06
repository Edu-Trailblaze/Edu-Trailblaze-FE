using EduTrailblaze.Repositories.Interfaces;
using EduTrailblaze.Entities;
using EduTrailblaze.Services.Interfaces;

namespace EduTrailblaze.Services
{
    public class NotificationService : INotificationService
    {
        private readonly IRepository<Notification, int> _notificationRepository;

        public NotificationService(IRepository<Notification, int> notificationRepository)
        {
            _notificationRepository = notificationRepository;
        }

        public async Task<Notification?> GetNotification(int notificationId)
        {
            try
            {
                return await _notificationRepository.GetByIdAsync(notificationId);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the notification.", ex);
            }
        }
        
        public async Task<IEnumerable<Notification>> GetNotifications()
        {
            try
            {
                return await _notificationRepository.GetAllAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the notification.", ex);
            }
        }

        public async Task AddNotification(Notification notification)
        {
            try
            {
                await _notificationRepository.AddAsync(notification);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while adding the notification.", ex);
            }
        }

        public async Task UpdateNotification(Notification notification)
        {
            try
            {
                await _notificationRepository.UpdateAsync(notification);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while updating the notification.", ex);
            }
        }

        public async Task DeleteNotification(Notification notification)
        {
            try
            {
                await _notificationRepository.DeleteAsync(notification);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while deleting the notification.", ex);
            }
        }
    }
}
