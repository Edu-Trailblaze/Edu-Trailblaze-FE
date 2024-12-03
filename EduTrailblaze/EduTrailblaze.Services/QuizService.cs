using EduTrailblaze.Repositories.Interfaces;
using EduTrailblaze.Entities;
using EduTrailblaze.Services.Interfaces;

namespace EduTrailblaze.Services
{
    public class QuizService : IQuizService
    {
        private readonly IRepository<Quiz> _quizRepository;

        public QuizService(IRepository<Quiz> quizRepository)
        {
            _quizRepository = quizRepository;
        }

        public async Task<Quiz?> GetQuiz(int quizId)
        {
            try
            {
                return await _quizRepository.GetByIdAsync(quizId);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the quiz.", ex);
            }
        }
        
        public async Task<IEnumerable<Quiz>> GetQuizs()
        {
            try
            {
                return await _quizRepository.GetAllAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the quiz.", ex);
            }
        }

        public async Task AddQuiz(Quiz quiz)
        {
            try
            {
                await _quizRepository.AddAsync(quiz);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while adding the quiz.", ex);
            }
        }

        public async Task UpdateQuiz(Quiz quiz)
        {
            try
            {
                await _quizRepository.UpdateAsync(quiz);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while updating the quiz.", ex);
            }
        }

        public async Task DeleteQuiz(Quiz quiz)
        {
            try
            {
                await _quizRepository.DeleteAsync(quiz);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while deleting the quiz.", ex);
            }
        }
    }
}
