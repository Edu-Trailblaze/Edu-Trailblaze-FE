using EduTrailblaze.Entities;
using EduTrailblaze.Services.DTOs;

namespace EduTrailblaze.Services.Interfaces
{
    public interface ICourseService
    {
        Task<Course?> GetCourse(int courseId);

        Task<IEnumerable<Course>> GetCourses();

        Task AddCourse(Course course);

        Task UpdateCourse(Course course);

        Task DeleteCourse(Course course);

        Task<List<CourseDTO>?> GetCoursesByConditions(GetCoursesRequest request);

        Task<decimal> CalculateEffectivePrice(int courseId);

        Task<int?> GetMaxDiscountId(int courseId);

        Task<List<CourseCardResponse>> GetCourseInformation(GetCoursesRequest request);
    }
}
