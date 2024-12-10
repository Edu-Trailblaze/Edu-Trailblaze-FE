using Microsoft.AspNetCore.Http;

namespace EduTrailblaze.Services.Interfaces
{
    public interface IWindowsDefenderService
    {
        Task<string> ScanFileWithWindowsDefenderReturnMessage(IFormFile file);
    }
}
