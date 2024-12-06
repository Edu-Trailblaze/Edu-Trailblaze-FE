using EduTrailblaze.Repositories.Interfaces;
using EduTrailblaze.Entities;
using EduTrailblaze.Services.Interfaces;

namespace EduTrailblaze.Services
{
    public class LectureService : ILectureService
    {
        private readonly IRepository<Lecture, int> _lectureRepository;

        public LectureService(IRepository<Lecture, int> lectureRepository)
        {
            _lectureRepository = lectureRepository;
        }

        public async Task<Lecture?> GetLecture(int lectureId)
        {
            try
            {
                return await _lectureRepository.GetByIdAsync(lectureId);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the lecture.", ex);
            }
        }
        
        public async Task<IEnumerable<Lecture>> GetLectures()
        {
            try
            {
                return await _lectureRepository.GetAllAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the lecture.", ex);
            }
        }

        public async Task AddLecture(Lecture lecture)
        {
            try
            {
                await _lectureRepository.AddAsync(lecture);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while adding the lecture.", ex);
            }
        }

        public async Task UpdateLecture(Lecture lecture)
        {
            try
            {
                await _lectureRepository.UpdateAsync(lecture);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while updating the lecture.", ex);
            }
        }

        public async Task DeleteLecture(Lecture lecture)
        {
            try
            {
                await _lectureRepository.DeleteAsync(lecture);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while deleting the lecture.", ex);
            }
        }
    }
}
