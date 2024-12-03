using EduTrailblaze.Entities;

namespace EduTrailblaze.Services.Interfaces
{
    public interface ICourseDiscountService
    {
        Task<CourseDiscount?> GetCourseDiscount(int courseId);

        Task<IEnumerable<CourseDiscount>> GetCourseDiscounts();

        Task AddCourseDiscount(CourseDiscount course);

        Task UpdateCourseDiscount(CourseDiscount course);

        Task DeleteCourseDiscount(CourseDiscount course);
    }
}
