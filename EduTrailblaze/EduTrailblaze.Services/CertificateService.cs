using EduTrailblaze.Entities;
using EduTrailblaze.Repositories.Interfaces;
using EduTrailblaze.Services.Interfaces;

namespace EduTrailblaze.Services
{
    public class CertificateService : ICertificateService
    {
        private readonly IRepository<Certificate, int> _certificateRepository;

        public CertificateService(IRepository<Certificate, int> certificateRepository)
        {
            _certificateRepository = certificateRepository;
        }

        public async Task<Certificate?> GetCertificate(int certificateId)
        {
            try
            {
                return await _certificateRepository.GetByIdAsync(certificateId);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the Certificate.", ex);
            }
        }

        public async Task<IEnumerable<Certificate>> GetCertificates()
        {
            try
            {
                return await _certificateRepository.GetAllAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the Certificate.", ex);
            }
        }

        public async Task AddCertificate(Certificate certificate)
        {
            try
            {
                await _certificateRepository.AddAsync(certificate);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while adding the Certificate.", ex);
            }
        }

        public async Task UpdateCertificate(Certificate certificate)
        {
            try
            {
                await _certificateRepository.UpdateAsync(certificate);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while updating the Certificate.", ex);
            }
        }

        public async Task DeleteCertificate(Certificate certificate)
        {
            try
            {
                await _certificateRepository.DeleteAsync(certificate);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while deleting the Certificate.", ex);
            }
        }
    }
}
