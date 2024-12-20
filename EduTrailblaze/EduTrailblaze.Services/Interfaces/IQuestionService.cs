using EduTrailblaze.Entities;
using EduTrailblaze.Services.DTOs;

namespace EduTrailblaze.Services.Interfaces
{
    public interface IQuestionService
    {
        Task<Question?> GetQuestion(int questionId);

        Task<IEnumerable<Question>> GetQuestions();

        Task AddQuestion(Question question);

        Task UpdateQuestion(Question question);

        Task AddQuestion(CreateQuestionRequest question);

        Task UpdateQuestion(UpdateQuestionRequest question);

        Task DeleteQuestion(Question question);

        Task DeleteQuestion(int question);
    }
}
