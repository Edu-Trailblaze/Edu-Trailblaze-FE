using EduTrailblaze.Entities;
using EduTrailblaze.Services.DTOs;

namespace EduTrailblaze.Services.Interfaces
{
    public interface ITagService
    {
        Task<Tag?> GetTag(int tagId);

        Task<IEnumerable<Tag>> GetTags();

        Task AddTag(Tag tag);

        Task UpdateTag(Tag tag);

        Task DeleteTag(Tag tag);

        Task AddTag(CreateTagRequest tag);

        Task UpdateTag(UpdateTagRequest tag);

        Task DeleteTag(int tag);
    }
}
