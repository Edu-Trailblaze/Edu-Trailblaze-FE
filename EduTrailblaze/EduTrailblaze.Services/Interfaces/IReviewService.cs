using EduTrailblaze.Entities;

namespace EduTrailblaze.Services.Interfaces
{
    public interface IReviewService
    {
        Task<Review?> GetReview(int reviewId);

        Task<IEnumerable<Review>> GetReviews();

        Task AddReview(Review review);

        Task UpdateReview(Review review);

        Task DeleteReview(Review review);
    }
}
