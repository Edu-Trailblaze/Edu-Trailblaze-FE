using EduTrailblaze.Entities;

namespace EduTrailblaze.Services.Interfaces
{
    public interface ICourseService
    {
        Task<Course?> GetCourse(int courseId);

        Task<IEnumerable<Course>> GetCourses();

        Task AddCourse(Course course);

        Task UpdateCourse(Course course);

        Task DeleteCourse(Course course);
    }
}
