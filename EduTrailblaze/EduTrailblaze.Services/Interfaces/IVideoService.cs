using EduTrailblaze.Entities;

namespace EduTrailblaze.Services.Interfaces
{
    public interface IVideoService
    {
        Task<Video?> GetVideo(int videoId);

        Task<IEnumerable<Video>> GetVideos();

        Task AddVideo(Video video);

        Task UpdateVideo(Video video);

        Task DeleteVideo(Video video);
    }
}
