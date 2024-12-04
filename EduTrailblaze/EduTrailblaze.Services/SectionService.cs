using EduTrailblaze.Repositories.Interfaces;
using EduTrailblaze.Entities;
using EduTrailblaze.Services.Interfaces;

namespace EduTrailblaze.Services
{
    public class SectionService : ISectionService
    {
        private readonly IRepository<Section, int> _sectionRepository;

        public SectionService(IRepository<Section, int> sectionRepository)
        {
            _sectionRepository = sectionRepository;
        }

        public async Task<Section?> GetSection(int sectionId)
        {
            try
            {
                return await _sectionRepository.GetByIdAsync(sectionId);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the section.", ex);
            }
        }
        
        public async Task<IEnumerable<Section>> GetSections()
        {
            try
            {
                return await _sectionRepository.GetAllAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the section.", ex);
            }
        }

        public async Task AddSection(Section section)
        {
            try
            {
                await _sectionRepository.AddAsync(section);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while adding the section.", ex);
            }
        }

        public async Task UpdateSection(Section section)
        {
            try
            {
                await _sectionRepository.UpdateAsync(section);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while updating the section.", ex);
            }
        }

        public async Task DeleteSection(Section section)
        {
            try
            {
                await _sectionRepository.DeleteAsync(section);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while deleting the section.", ex);
            }
        }
    }
}
