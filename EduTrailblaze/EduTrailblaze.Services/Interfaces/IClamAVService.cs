using Microsoft.AspNetCore.Http;

namespace EduTrailblaze.Services.Interfaces
{
    public interface IClamAVService
    {
        Task<(string, string)> ScanFileWithClamd(IFormFile file);
    }
}
