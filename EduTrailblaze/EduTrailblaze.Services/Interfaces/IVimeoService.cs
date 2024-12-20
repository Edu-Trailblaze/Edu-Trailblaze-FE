using EduTrailblaze.Services.DTOs;

namespace EduTrailblaze.Services.Interfaces
{
    public interface IVimeoService
    {
        Task<UploadVideoResponse> UploadVideoAsync(string filePath, string title, string description);

        Task<string> UploadVideoAsync(string filePath);

        Task DeleteVideoAsync(long videoId);
    }
}
