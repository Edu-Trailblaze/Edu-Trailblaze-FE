using EduTrailblaze.Services.DTOs;

namespace EduTrailblaze.Services.Interfaces
{
    public interface ISearchService
    {
        Task<List<CourseDTO>> SearchCourseUsingElasticSearch(List<CourseDTO> list);
    }
}
