using EduTrailblaze.Entities;

namespace EduTrailblaze.Services.Interfaces
{
    public interface IQuestionService
    {
        Task<Question?> GetQuestion(int questionId);

        Task<IEnumerable<Question>> GetQuestions();

        Task AddQuestion(Question question);

        Task UpdateQuestion(Question question);

        Task DeleteQuestion(Question question);
    }
}
