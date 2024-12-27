using Microsoft.AspNetCore.Http;

namespace EduTrailblaze.Services.Interfaces
{
    public interface IVoskService
    {
        Task<string> ConvertSpeechToTextAsyncFromFile(IFormFile audio);
    }
}
