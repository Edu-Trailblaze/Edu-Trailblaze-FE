using EduTrailblaze.Entities;
using EduTrailblaze.Repositories.Interfaces;
using EduTrailblaze.Services.Interfaces;

namespace EduTrailblaze.Services
{
    public class TagService : ITagService
    {
        private readonly IRepository<Tag, int> _tagRepository;

        public TagService(IRepository<Tag, int> tagRepository)
        {
            _tagRepository = tagRepository;
        }

        public async Task<Tag?> GetTag(int tagId)
        {
            try
            {
                return await _tagRepository.GetByIdAsync(tagId);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the tag.", ex);
            }
        }

        public async Task<IEnumerable<Tag>> GetTags()
        {
            try
            {
                return await _tagRepository.GetAllAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the tag.", ex);
            }
        }

        public async Task AddTag(Tag tag)
        {
            try
            {
                await _tagRepository.AddAsync(tag);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while adding the tag.", ex);
            }
        }

        public async Task UpdateTag(Tag tag)
        {
            try
            {
                await _tagRepository.UpdateAsync(tag);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while updating the tag.", ex);
            }
        }

        public async Task DeleteTag(Tag tag)
        {
            try
            {
                await _tagRepository.DeleteAsync(tag);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while deleting the tag.", ex);
            }
        }
    }
}
