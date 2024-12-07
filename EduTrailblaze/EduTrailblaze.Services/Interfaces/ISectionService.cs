using EduTrailblaze.Entities;

namespace EduTrailblaze.Services.Interfaces
{
    public interface ISectionService
    {
        Task<Section?> GetSection(int sectionId);

        Task<IEnumerable<Section>> GetSections();

        Task AddSection(Section section);

        Task UpdateSection(Section section);

        Task DeleteSection(Section section);
    }
}
