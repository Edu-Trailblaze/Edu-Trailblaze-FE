using EduTrailblaze.Entities;

namespace EduTrailblaze.Services.Interfaces
{
    public interface ITagService
    {
        Task<Tag?> GetTag(int tagId);

        Task<IEnumerable<Tag>> GetTags();

        Task AddTag(Tag tag);

        Task UpdateTag(Tag tag);

        Task DeleteTag(Tag tag);
    }
}
