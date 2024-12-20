using EduTrailblaze.Entities;

namespace EduTrailblaze.Services.Helper
{
    public interface ITokenGenerator
    {
        Task<string> GenerateJwtToken(User user, string role);
        Task<string> GenerateRefreshToken();
    }
}
