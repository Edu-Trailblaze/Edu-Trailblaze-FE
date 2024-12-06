using EduTrailblaze.Repositories.Interfaces;
using EduTrailblaze.Entities;
using EduTrailblaze.Services.Interfaces;

namespace EduTrailblaze.Services
{
    public class QuestionService : IQuestionService
    {
        private readonly IRepository<Question> _questionRepository;

        public QuestionService(IRepository<Question> questionRepository)
        {
            _questionRepository = questionRepository;
        }

        public async Task<Question?> GetQuestion(int questionId)
        {
            try
            {
                return await _questionRepository.GetByIdAsync(questionId);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the question.", ex);
            }
        }
        
        public async Task<IEnumerable<Question>> GetQuestions()
        {
            try
            {
                return await _questionRepository.GetAllAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the question.", ex);
            }
        }

        public async Task AddQuestion(Question question)
        {
            try
            {
                await _questionRepository.AddAsync(question);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while adding the question.", ex);
            }
        }

        public async Task UpdateQuestion(Question question)
        {
            try
            {
                await _questionRepository.UpdateAsync(question);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while updating the question.", ex);
            }
        }

        public async Task DeleteQuestion(Question question)
        {
            try
            {
                await _questionRepository.DeleteAsync(question);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while deleting the question.", ex);
            }
        }
    }
}
