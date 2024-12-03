using EduTrailblaze.Entities;

namespace EduTrailblaze.Services.Interfaces
{
    public interface INotificationService
    {
        Task<Notification?> GetNotification(int notificationId);

        Task<IEnumerable<Notification>> GetNotifications();

        Task AddNotification(Notification notification);

        Task UpdateNotification(Notification notification);

        Task DeleteNotification(Notification notification);
    }
}
