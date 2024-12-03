using EduTrailblaze.Entities;

namespace EduTrailblaze.Services.Interfaces
{
    public interface INewsService
    {
        Task<News?> GetNews(int newsId);

        Task<IEnumerable<News>> GetNews();

        Task AddNews(News news);

        Task UpdateNews(News news);

        Task DeleteNews(News news);
    }
}
