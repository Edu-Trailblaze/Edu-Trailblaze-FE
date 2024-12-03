using EduTrailblaze.Entities;

namespace EduTrailblaze.Services.Interfaces
{
    public interface IQuizService
    {
        Task<Quiz?> GetQuiz(int quizId);

        Task<IEnumerable<Quiz>> GetQuizs();

        Task AddQuiz(Quiz quiz);

        Task UpdateQuiz(Quiz quiz);

        Task DeleteQuiz(Quiz quiz);
    }
}
