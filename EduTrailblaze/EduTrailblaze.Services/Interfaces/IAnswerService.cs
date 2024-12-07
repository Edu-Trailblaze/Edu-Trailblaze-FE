using EduTrailblaze.Entities;

namespace EduTrailblaze.Services.Interfaces
{
    public interface IAnswerService
    {
        Task<Answer?> GetAnswer(int answerId);

        Task<IEnumerable<Answer>> GetAnswers();

        Task AddAnswer(Answer answer);

        Task UpdateAnswer(Answer answer);

        Task DeleteAnswer(Answer answer);
    }
}
