using EduTrailblaze.Entities;

namespace EduTrailblaze.Services.Interfaces
{
    public interface IEnrollmentService
    {
        Task<Enrollment?> GetEnrollment(int enrollmentId);

        Task<IEnumerable<Enrollment>> GetEnrollments();

        Task AddEnrollment(Enrollment enrollment);

        Task UpdateEnrollment(Enrollment enrollment);

        Task DeleteEnrollment(Enrollment enrollment);

        Task<int> GetNumberOfStudentsEnrolledInCourse(int courseId);
    }
}