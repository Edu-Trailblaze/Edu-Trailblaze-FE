using EduTrailblaze.Repositories.Interfaces;
using EduTrailblaze.Entities;
using EduTrailblaze.Services.Interfaces;

namespace EduTrailblaze.Services
{
    public class ReviewService : IReviewService
    {
        private readonly IRepository<Review> _reviewRepository;

        public ReviewService(IRepository<Review> reviewRepository)
        {
            _reviewRepository = reviewRepository;
        }

        public async Task<Review?> GetReview(int reviewId)
        {
            try
            {
                return await _reviewRepository.GetByIdAsync(reviewId);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the review.", ex);
            }
        }
        
        public async Task<IEnumerable<Review>> GetReviews()
        {
            try
            {
                return await _reviewRepository.GetAllAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the review.", ex);
            }
        }

        public async Task AddReview(Review review)
        {
            try
            {
                await _reviewRepository.AddAsync(review);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while adding the review.", ex);
            }
        }

        public async Task UpdateReview(Review review)
        {
            try
            {
                await _reviewRepository.UpdateAsync(review);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while updating the review.", ex);
            }
        }

        public async Task DeleteReview(Review review)
        {
            try
            {
                await _reviewRepository.DeleteAsync(review);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while deleting the review.", ex);
            }
        }
    }
}
