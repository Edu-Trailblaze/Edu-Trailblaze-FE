using EduTrailblaze.Entities;

namespace EduTrailblaze.Services.Interfaces
{
    public interface ICertificateService
    {
        Task<Certificate?> GetCertificate(int certificateId);

        Task<IEnumerable<Certificate>> GetCertificates();

        Task AddCertificate(Certificate certificate);

        Task UpdateCertificate(Certificate certificate);

        Task DeleteCertificate(Certificate certificate);
    }
}
