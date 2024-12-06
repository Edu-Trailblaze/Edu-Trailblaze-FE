using EduTrailblaze.Entities;
using EduTrailblaze.Repositories.Interfaces;
using EduTrailblaze.Services.Interfaces;

namespace EduTrailblaze.Services
{
    public class AnswerService : IAnswerService
    {
        private readonly IRepository<Answer, int> _answerRepository;

        public AnswerService(IRepository<Answer, int> answerRepository)
        {
            _answerRepository = answerRepository;
        }

        public async Task<Answer?> GetAnswer(int answerId)
        {
            try
            {
                return await _answerRepository.GetByIdAsync(answerId);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the Answer.", ex);
            }
        }

        public async Task<IEnumerable<Answer>> GetAnswers()
        {
            try
            {
                return await _answerRepository.GetAllAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the Answer.", ex);
            }
        }

        public async Task AddAnswer(Answer answer)
        {
            try
            {
                await _answerRepository.AddAsync(answer);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while adding the Answer.", ex);
            }
        }

        public async Task UpdateAnswer(Answer answer)
        {
            try
            {
                await _answerRepository.UpdateAsync(answer);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while updating the Answer.", ex);
            }
        }

        public async Task DeleteAnswer(Answer answer)
        {
            try
            {
                await _answerRepository.DeleteAsync(answer);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while deleting the Answer.", ex);
            }
        }
    }
}
