using EduTrailblaze.Entities;

namespace EduTrailblaze.Services.Interfaces
{
    public interface IQuizAnswerService
    {
        Task<QuizAnswer?> GetQuizAnswer(int quizAnswerId);

        Task<IEnumerable<QuizAnswer>> GetQuizAnswers();

        Task AddQuizAnswer(QuizAnswer quizAnswer);

        Task UpdateQuizAnswer(QuizAnswer quizAnswer);

        Task DeleteQuizAnswer(QuizAnswer quizAnswer);
    }
}
