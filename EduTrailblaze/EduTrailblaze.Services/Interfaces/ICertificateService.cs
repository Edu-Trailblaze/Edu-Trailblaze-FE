using EduTrailblaze.Entities;
using EduTrailblaze.Services.DTOs;

namespace EduTrailblaze.Services.Interfaces
{
    public interface ICertificateService
    {
        Task<Certificate?> GetCertificate(int certificateId);

        Task<IEnumerable<Certificate>> GetCertificates();

        Task AddCertificate(Certificate certificate);

        Task UpdateCertificate(Certificate certificate);

        Task DeleteCertificate(Certificate certificate);

        Task DeleteCertificate(int certificateId);

        Task AddCertificate(CreateCertificateRequest certificate);

        Task UpdateCertificate(UpdateCertificateRequest certificate);
    }
}
