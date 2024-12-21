using EduTrailblaze.Entities;
using EduTrailblaze.Repositories.Interfaces;
using EduTrailblaze.Services.DTOs;
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

        public async Task AddSection(CreateSectionRequest section)
        {
            try
            {
                var newSection = new Section
                {
                    CourseId = section.CourseId,
                    Title = section.Title,
                    Description = section.Description
                };
                await _sectionRepository.AddAsync(newSection);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while adding the section.", ex);
            }
        }

        public async Task UpdateSection(UpdateSectionRequest section)
        {
            try
            {
                var existingSection = await _sectionRepository.GetByIdAsync(section.SectionId);
                if (existingSection == null)
                {
                    throw new Exception("Section not found.");
                }
                existingSection.Title = section.Title;
                existingSection.Description = section.Description;
                await _sectionRepository.UpdateAsync(existingSection);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while updating the section.", ex);
            }
        }

        public async Task DeleteSection(int sectionId)
        {
            try
            {
                var section = await _sectionRepository.GetByIdAsync(sectionId);
                if (section == null)
                {
                    throw new Exception("Section not found.");
                }
                await _sectionRepository.DeleteAsync(section);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while deleting the section.", ex);
            }
        }
    }
}
