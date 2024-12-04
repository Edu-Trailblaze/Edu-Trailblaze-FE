using EduTrailblaze.Repositories.Interfaces;
using EduTrailblaze.Entities;
using EduTrailblaze.Services.Interfaces;

namespace EduTrailblaze.Services
{
    public class NewsService : INewsService
    {
        private readonly IRepository<News, int> _newsRepository;

        public NewsService(IRepository<News, int> newsRepository)
        {
            _newsRepository = newsRepository;
        }

        public async Task<News?> GetNews(int newsId)
        {
            try
            {
                return await _newsRepository.GetByIdAsync(newsId);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the news.", ex);
            }
        }
        
        public async Task<IEnumerable<News>> GetNews()
        {
            try
            {
                return await _newsRepository.GetAllAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the news.", ex);
            }
        }

        public async Task AddNews(News news)
        {
            try
            {
                await _newsRepository.AddAsync(news);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while adding the news.", ex);
            }
        }

        public async Task UpdateNews(News news)
        {
            try
            {
                await _newsRepository.UpdateAsync(news);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while updating the news.", ex);
            }
        }

        public async Task DeleteNews(News news)
        {
            try
            {
                await _newsRepository.DeleteAsync(news);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while deleting the news.", ex);
            }
        }
    }
}
