using EduTrailblaze.Entities;
using EduTrailblaze.Services.DTOs;

namespace EduTrailblaze.Services.Interfaces
{
    public interface IAnswerService
    {
        Task<Answer?> GetAnswer(int answerId);

        Task<IEnumerable<Answer>> GetAnswers();

        Task AddAnswer(Answer answer);

        Task UpdateAnswer(Answer answer);

        Task DeleteAnswer(Answer answer);

        Task DeleteAnswer(int answerId);

        Task UpdateAnswer(UpdateAnswerRequest answer);

        Task AddAnswer(CreateAnswerRequest answer);
    }
}
