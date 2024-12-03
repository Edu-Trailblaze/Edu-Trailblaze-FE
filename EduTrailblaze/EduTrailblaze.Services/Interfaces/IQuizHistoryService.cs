using EduTrailblaze.Entities;

namespace EduTrailblaze.Services.Interfaces
{
    public interface IQuizHistoryService
    {
        Task<QuizHistory?> GetQuizHistory(int quizHistoryId);

        Task<IEnumerable<QuizHistory>> GetQuizHistorys();

        Task AddQuizHistory(QuizHistory quizHistory);

        Task UpdateQuizHistory(QuizHistory quizHistory);

        Task DeleteQuizHistory(QuizHistory quizHistory);
    }
}
