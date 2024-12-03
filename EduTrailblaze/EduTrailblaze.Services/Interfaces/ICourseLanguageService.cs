using EduTrailblaze.Entities;

namespace EduTrailblaze.Services.Interfaces
{
    public interface ICourseLanguageService
    {
        Task<CourseLanguage?> GetCourseLanguage(int courseLanguageId);

        Task<IEnumerable<CourseLanguage>> GetCourseLanguages();

        Task AddCourseLanguage(CourseLanguage courseLanguage);

        Task UpdateCourseLanguage(CourseLanguage courseLanguage);

        Task DeleteCourseLanguage(CourseLanguage courseLanguage);
    }
}
