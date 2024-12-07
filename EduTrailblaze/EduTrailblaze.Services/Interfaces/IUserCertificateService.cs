using EduTrailblaze.Entities;

namespace EduTrailblaze.Services.Interfaces
{
    public interface IUserCertificateService
    {
        Task<UserCertificate?> GetUserCertificate(int userCertificateId);

        Task<IEnumerable<UserCertificate>> GetUserCertificates();

        Task AddUserCertificate(UserCertificate userCertificate);

        Task UpdateUserCertificate(UserCertificate userCertificate);

        Task DeleteUserCertificate(UserCertificate userCertificate);
    }
}
