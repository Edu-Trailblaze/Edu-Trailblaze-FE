using EduTrailblaze.Entities;

namespace EduTrailblaze.Services.Interfaces
{
    public interface ILectureService
    {
        Task<Lecture?> GetLecture(int lectureId);

        Task<IEnumerable<Lecture>> GetLectures();

        Task AddLecture(Lecture lecture);

        Task UpdateLecture(Lecture lecture);

        Task DeleteLecture(Lecture lecture);
    }
}
