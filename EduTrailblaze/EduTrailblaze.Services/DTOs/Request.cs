using FluentValidation;
using Nest;

namespace EduTrailblaze.Services.DTOs
{
    public class GetCoursesRequest
    {
        public string? InstructorId { get; set; } = null;
        public int? LanguageId { get; set; } = null;
        public int? TagId { get; set; } = null;
        public string? Title { get; set; } = null;
        public decimal? MinRating { get; set; } = null;
        public decimal? MaxRating { get; set; } = null;
        public decimal? MinPrice { get; set; } = null;
        public decimal? MaxPrice { get; set; } = null;
        public bool? IsFree { get; set; } = null;
        public int? MinDuration { get; set; } = null;
        public int? MaxDuration { get; set; } = null;
        public bool? HasQuizzes { get; set; } = null;
        public string? DifficultyLevel { get; set; } = null;
        public bool? IsPublished { get; set; } = null;
        public bool? IsDeleted { get; set; } = null;
    }

    public class GetCoursesRequestValidator : AbstractValidator<GetCoursesRequest>
    {
        public GetCoursesRequestValidator()
        {
            RuleFor(x => x.Title)
                .MaximumLength(255).WithMessage("Title cannot be longer than 255 characters")
                .When(x => !string.IsNullOrEmpty(x.Title));

            RuleFor(x => x.MinRating)
                .InclusiveBetween(0, 5).WithMessage("MinRating must be between 0 and 5")
                .When(x => x.MinRating.HasValue);

            RuleFor(x => x.MaxRating)
                .InclusiveBetween(0, 5).WithMessage("MaxRating must be between 0 and 5")
                .GreaterThanOrEqualTo(x => x.MinRating).WithMessage("MaxRating must be greater than or equal to MinRating")
                .When(x => x.MaxRating.HasValue);

            RuleFor(x => x.MinPrice)
                .GreaterThanOrEqualTo(0).WithMessage("MinPrice must be greater than or equal to 0")
                .When(x => x.MinPrice.HasValue);

            RuleFor(x => x.MaxPrice)
                .GreaterThanOrEqualTo(0).WithMessage("MaxPrice must be greater than or equal to 0")
                .GreaterThanOrEqualTo(x => x.MinPrice ?? 0).WithMessage("MaxPrice must be greater than or equal to MinPrice")
                .When(x => x.MaxPrice.HasValue);

            RuleFor(x => x.MinDuration)
                .GreaterThanOrEqualTo(0).WithMessage("MinDuration must be greater than or equal to 0")
                .When(x => x.MinDuration.HasValue);

            RuleFor(x => x.MaxDuration)
                .GreaterThanOrEqualTo(0).WithMessage("MaxDuration must be greater than or equal to 0")
                .GreaterThanOrEqualTo(x => x.MinDuration ?? 0).WithMessage("MaxDuration must be greater than or equal to MinDuration")
                .When(x => x.MaxDuration.HasValue);

            RuleFor(x => x.DifficultyLevel)
                .MaximumLength(50).WithMessage("DifficultyLevel must be Beginner, Intermediate, Advanced")
                .When(x => !string.IsNullOrEmpty(x.DifficultyLevel));
        }
    }
}
