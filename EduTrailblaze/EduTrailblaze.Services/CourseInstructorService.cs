using EduTrailblaze.Entities;
using EduTrailblaze.Repositories.Interfaces;
using EduTrailblaze.Services.Interfaces;

namespace EduTrailblaze.Services
{
    public class CourseInstructorService : ICourseInstructorService
    {
        private readonly IRepository<CourseInstructor, int> _courseInstructorRepository;

        public CourseInstructorService(IRepository<CourseInstructor, int> courseInstructorRepository)
        {
            _courseInstructorRepository = courseInstructorRepository;
        }

        public async Task<CourseInstructor?> GetCourseInstructor(int courseInstructorId)
        {
            try
            {
                return await _courseInstructorRepository.GetByIdAsync(courseInstructorId);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the courseInstructor.", ex);
            }
        }

        public async Task<IEnumerable<CourseInstructor>> GetCourseInstructors()
        {
            try
            {
                return await _courseInstructorRepository.GetAllAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the courseInstructor.", ex);
            }
        }

        public async Task AddCourseInstructor(CourseInstructor courseInstructor)
        {
            try
            {
                await _courseInstructorRepository.AddAsync(courseInstructor);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while adding the courseInstructor.", ex);
            }
        }

        public async Task UpdateCourseInstructor(CourseInstructor courseInstructor)
        {
            try
            {
                await _courseInstructorRepository.UpdateAsync(courseInstructor);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while updating the courseInstructor.", ex);
            }
        }

        public async Task DeleteCourseInstructor(CourseInstructor courseInstructor)
        {
            try
            {
                await _courseInstructorRepository.DeleteAsync(courseInstructor);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while deleting the courseInstructor.", ex);
            }
        }
    }
}
