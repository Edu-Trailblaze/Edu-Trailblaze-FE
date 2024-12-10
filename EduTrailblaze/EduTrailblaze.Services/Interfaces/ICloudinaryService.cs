namespace EduTrailblaze.Services.Interfaces
{
    public interface ICloudinaryService
    {
        Task<string> UploadVideoAsync(string filePath, string publicId);

        Task DeleteVideoAsync(string publicId);
    }
}
