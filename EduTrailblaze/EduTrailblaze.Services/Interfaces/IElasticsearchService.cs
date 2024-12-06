using EduTrailblaze.Services.DTOs;

namespace EduTrailblaze.Services.Interfaces
{
    public interface IElasticsearchService
    {
        Task EnsureIndexExistsAsync(string indexName);
        Task<bool> IsAvailableAsync();
        Task CreateIndexAsync(string indexName);
        Task IndexCoursesAsync(List<CourseDTO> courses);
        Task<List<CourseDTO>> SearchCoursesByNameAsync(string name);
        Task ClearIndexAsync(string indexName);
        Task DeleteIndexAsync(string indexName);
    }
}
