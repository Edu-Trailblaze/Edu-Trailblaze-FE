﻿using EduTrailblaze.Services.Helper;
using FluentValidation;

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

    public class CreateCourseRequest
    {
        public string Title { get; set; }

        public string ImageURL { get; set; }

        public string Description { get; set; }

        public decimal Price { get; set; }

        public string DifficultyLevel { get; set; } // Beginner, Intermediate, Advanced

        public string CreatedBy { get; set; }

        public string? Prerequisites { get; set; }
    }

    public class CreateCourseRequestValidator : AbstractValidator<CreateCourseRequest>
    {
        public CreateCourseRequestValidator()
        {
            RuleFor(x => x.Title)
             .NotEmpty().WithMessage("Title is required")
             .MaximumLength(255).WithMessage("Title cannot be longer than 255 characters");

            RuleFor(x => x.ImageURL)
                .NotEmpty().WithMessage("ImageURL is required")
                .Must(uri => Uri.IsWellFormedUriString(uri, UriKind.Absolute)).WithMessage("ImageURL must be a valid URL");

            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("Description is required");

            RuleFor(x => x.Price)
                .GreaterThanOrEqualTo(0).WithMessage("Price must be greater than or equal to 0");

            RuleFor(x => x.DifficultyLevel)
                .NotEmpty().WithMessage("DifficultyLevel is required")
                .Must(level => new[] { "Beginner", "Intermediate", "Advanced" }.Contains(level))
                .WithMessage("DifficultyLevel must be Beginner, Intermediate, or Advanced");

            RuleFor(x => x.CreatedBy)
                .NotEmpty().WithMessage("CreatedBy is required");

            RuleFor(x => x.Prerequisites)
                .MaximumLength(1000).WithMessage("Prerequisites cannot be longer than 1000 characters")
                .When(x => !string.IsNullOrEmpty(x.Prerequisites));
        }
    }

    public class UpdateCourseRequest
    {
        public int CourseId { get; set; }

        public string Title { get; set; }

        public string ImageURL { get; set; }

        public string Description { get; set; }

        public decimal Price { get; set; }

        public string DifficultyLevel { get; set; } // Beginner, Intermediate, Advanced

        public string Prerequisites { get; set; }

        public string UpdatedBy { get; set; }

        public bool IsPublished { get; set; }

        public bool IsDeleted { get; set; }
    }

    public class UpdateCourseRequestValidator : AbstractValidator<UpdateCourseRequest>
    {
        public UpdateCourseRequestValidator()
        {

            RuleFor(x => x.CourseId)
                .NotEmpty().WithMessage("CourseId is required");

            RuleFor(x => x.Title)
             .NotEmpty().WithMessage("Title is required")
             .MaximumLength(255).WithMessage("Title cannot be longer than 255 characters");

            RuleFor(x => x.ImageURL)
                .NotEmpty().WithMessage("ImageURL is required")
                .Must(uri => Uri.IsWellFormedUriString(uri, UriKind.Absolute)).WithMessage("ImageURL must be a valid URL");

            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("Description is required");

            RuleFor(x => x.Price)
                .GreaterThanOrEqualTo(0).WithMessage("Price must be greater than or equal to 0");

            RuleFor(x => x.DifficultyLevel)
                .NotEmpty().WithMessage("DifficultyLevel is required")
                .Must(level => new[] { "Beginner", "Intermediate", "Advanced" }.Contains(level))
                .WithMessage("DifficultyLevel must be Beginner, Intermediate, or Advanced");

            RuleFor(x => x.UpdatedBy)
                .NotEmpty().WithMessage("UpdatedBy is required");

            RuleFor(x => x.Prerequisites)
                .MaximumLength(1000).WithMessage("Prerequisites cannot be longer than 1000 characters")
                .When(x => !string.IsNullOrEmpty(x.Prerequisites));
        }
    }

    public class CreateAnswerRequest
    {
        public int QuestionId { get; set; }
        public string AnswerText { get; set; }
        public bool IsCorrect { get; set; }
    }

    public class CreateAnswerRequestValidator : AbstractValidator<CreateAnswerRequest>
    {
        public CreateAnswerRequestValidator()
        {
            RuleFor(x => x.QuestionId)
                .NotEmpty().WithMessage("QuestionId is required");

            RuleFor(x => x.AnswerText)
                .NotEmpty().WithMessage("AnswerText is required");

            RuleFor(x => x.IsCorrect)
                .NotEmpty().WithMessage("IsCorrect is required");
        }
    }

    public class UpdateAnswerRequest
    {
        public int AnswerId { get; set; }
        public int QuestionId { get; set; }
        public string AnswerText { get; set; }
        public bool IsCorrect { get; set; }
    }

    public class UpdateAnswerRequestValidator : AbstractValidator<UpdateAnswerRequest>
    {
        public UpdateAnswerRequestValidator()
        {
            RuleFor(x => x.AnswerId)
                .NotEmpty().WithMessage("AnswerId is required");

            RuleFor(x => x.QuestionId)
                .NotEmpty().WithMessage("QuestionId is required");

            RuleFor(x => x.AnswerText)
                .NotEmpty().WithMessage("AnswerText is required");

            RuleFor(x => x.IsCorrect)
                .NotEmpty().WithMessage("IsCorrect is required");
        }
    }

    public class CreateCertificateRequest
    {
        public int CourseId { get; set; }
        public string CertificateTemplateUrl { get; set; }
    }

    public class CreateCertificateRequestValidator : AbstractValidator<CreateCertificateRequest>
    {
        public CreateCertificateRequestValidator()
        {
            RuleFor(x => x.CourseId)
                .NotEmpty().WithMessage("CourseId is required");
            RuleFor(x => x.CertificateTemplateUrl)
                .NotEmpty().WithMessage("CertificateTemplateUrl is required");
        }
    }

    public class UpdateCertificateRequest
    {
        public int CertificateId { get; set; }
        public int CourseId { get; set; }
        public string CertificateTemplateUrl { get; set; }
    }

    public class UpdateCertificateRequestValidator : AbstractValidator<UpdateCertificateRequest>
    {
        public UpdateCertificateRequestValidator()
        {
            RuleFor(x => x.CertificateId)
                .NotEmpty().WithMessage("CertificateId is required");
            RuleFor(x => x.CourseId)
                .NotEmpty().WithMessage("CourseId is required");
            RuleFor(x => x.CertificateTemplateUrl)
                .NotEmpty().WithMessage("CertificateTemplateUrl is required");
        }
    }

    public class CreateCouponRequest
    {
        public string Code { get; set; }
        public string DiscountType { get; set; }
        public decimal DiscountValue { get; set; }
        public DateTime ExpiryDate { get; set; }
    }

    public class CreateCouponRequestValidator : AbstractValidator<CreateCouponRequest>
    {
        public CreateCouponRequestValidator()
        {
            RuleFor(x => x.Code)
                .NotEmpty().WithMessage("Code is required")
                .MaximumLength(50).WithMessage("Code cannot be longer than 50 characters");
            RuleFor(x => x.DiscountType)
                .NotEmpty().WithMessage("DiscountType is required")
                .Must(type => new[] { "Percentage", "Value" }.Contains(type))
                .WithMessage("DiscountType must be Percentage or Value");
            RuleFor(x => x.DiscountValue)
                .NotEmpty().WithMessage("DiscountValue is required")
                .GreaterThanOrEqualTo(0).WithMessage("DiscountValue must be greater than or equal to 0");
            RuleFor(x => x.ExpiryDate)
                .NotEmpty().WithMessage("ExpiryDate is required")
                .GreaterThan(DateTimeHelper.GetVietnamTime()).WithMessage("ExpiryDate must be greater than the current date");
        }
    }

    public class UpdateCouponRequest
    {
        public int CouponId { get; set; }
        public string Code { get; set; }
        public string DiscountType { get; set; }
        public decimal DiscountValue { get; set; }
        public DateTime ExpiryDate { get; set; }
        public bool IsActive { get; set; }
    }

    public class UpdateCouponRequestValidator : AbstractValidator<UpdateCouponRequest>
    {
        public UpdateCouponRequestValidator()
        {
            RuleFor(x => x.CouponId)
                .NotEmpty().WithMessage("CouponId is required");
            RuleFor(x => x.Code)
                .NotEmpty().WithMessage("Code is required")
                .MaximumLength(50).WithMessage("Code cannot be longer than 50 characters");
            RuleFor(x => x.DiscountType)
                .NotEmpty().WithMessage("DiscountType is required")
                .Must(type => new[] { "Percentage", "Value" }.Contains(type))
                .WithMessage("DiscountType must be Percentage or Value");
            RuleFor(x => x.DiscountValue)
                .NotEmpty().WithMessage("DiscountValue is required")
                .GreaterThanOrEqualTo(0).WithMessage("DiscountValue must be greater than or equal to 0");
            RuleFor(x => x.ExpiryDate)
                .NotEmpty().WithMessage("ExpiryDate is required")
                .GreaterThan(DateTimeHelper.GetVietnamTime()).WithMessage("ExpiryDate must be greater than the current date");
        }
    }

    public class CreateDiscountRequest
    {
        public string DiscountType { get; set; }
        public decimal DiscountValue { get; set; }
        public DateTime StartDate { get; set; } = DateTimeHelper.GetVietnamTime();
        public DateTime EndDate { get; set; }
    }

    public class CreateDiscountRequestValidator : AbstractValidator<CreateDiscountRequest>
    {
        public CreateDiscountRequestValidator()
        {
            RuleFor(x => x.DiscountType)
                .NotEmpty().WithMessage("DiscountType is required")
                .MaximumLength(50).WithMessage("DiscountType cannot be longer than 50 characters");
            RuleFor(x => x.DiscountValue)
                .NotEmpty().WithMessage("DiscountValue is required")
                .GreaterThanOrEqualTo(0).WithMessage("DiscountValue must be greater than or equal to 0");
            RuleFor(x => x.StartDate)
                .NotEmpty().WithMessage("StartDate is required")
                .GreaterThan(DateTimeHelper.GetVietnamTime()).WithMessage("StartDate must be greater than the current date");
            RuleFor(x => x.EndDate)
                .NotEmpty().WithMessage("EndDate is required")
                .GreaterThan(x => x.StartDate).WithMessage("EndDate must be greater than StartDate");
        }
    }

    public class UpdateDiscountRequest
    {
        public int DiscountId { get; set; }
        public string DiscountType { get; set; }
        public decimal DiscountValue { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsActive { get; set; }
    }

    public class UpdateDiscountRequestValidator : AbstractValidator<UpdateDiscountRequest>
    {
        public UpdateDiscountRequestValidator()
        {
            RuleFor(x => x.DiscountId)
                .NotEmpty().WithMessage("DiscountId is required");
            RuleFor(x => x.DiscountType)
                .NotEmpty().WithMessage("DiscountType is required")
                .MaximumLength(50).WithMessage("DiscountType cannot be longer than 50 characters");
            RuleFor(x => x.DiscountValue)
                .NotEmpty().WithMessage("DiscountValue is required")
                .GreaterThanOrEqualTo(0).WithMessage("DiscountValue must be greater than or equal to 0");
            RuleFor(x => x.StartDate)
                .NotEmpty().WithMessage("StartDate is required")
                .GreaterThan(DateTimeHelper.GetVietnamTime()).WithMessage("StartDate must be greater than the current date");
            RuleFor(x => x.EndDate)
                .NotEmpty().WithMessage("EndDate is required")
                .GreaterThan(x => x.StartDate).WithMessage("EndDate must be greater than StartDate");
        }
    }

    public class CreateLanguageRequest
    {
        public string Name { get; set; }
        public string Code { get; set; }
    }

    public class CreateLanguageRequestValidator : AbstractValidator<CreateLanguageRequest>
    {
        public CreateLanguageRequestValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Name is required")
                .MaximumLength(50).WithMessage("Name cannot be longer than 50 characters");
            RuleFor(x => x.Code)
                .NotEmpty().WithMessage("Code is required")
                .MaximumLength(10).WithMessage("Code cannot be longer than 10 characters");
        }
    }

    public class UpdateLanguageRequest
    {
        public int LanguageId { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
    }

    public class UpdateLanguageRequestValidator : AbstractValidator<UpdateLanguageRequest>
    {
        public UpdateLanguageRequestValidator()
        {
            RuleFor(x => x.LanguageId)
                .NotEmpty().WithMessage("LanguageId is required");
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Name is required")
                .MaximumLength(50).WithMessage("Name cannot be longer than 50 characters");
            RuleFor(x => x.Code)
                .NotEmpty().WithMessage("Code is required")
                .MaximumLength(10).WithMessage("Code cannot be longer than 10 characters");
        }
    }

    public class CreateLectureRequest
    {
        public int SectionId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string Description { get; set; }
        public int Duration { get; set; }
    }

    public class CreateLectureRequestValidator : AbstractValidator<CreateLectureRequest>
    {
        public CreateLectureRequestValidator()
        {
            RuleFor(x => x.SectionId)
                .NotEmpty().WithMessage("SectionId is required");
            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Title is required")
                .MaximumLength(50).WithMessage("Title cannot be longer than 50 characters");
            RuleFor(x => x.Content)
                .NotEmpty().WithMessage("Content is required");
            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("Description is required");
            RuleFor(x => x.Duration)
                .NotEmpty().WithMessage("Duration is required")
                .GreaterThanOrEqualTo(0).WithMessage("Duration must be greater than or equal to 0");
        }
    }

    public class UpdateLectureRequest
    {
        public int LectureId { get; set; }
        public int SectionId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string Description { get; set; }
        public int Duration { get; set; }
    }

    public class UpdateLectureRequestValidator : AbstractValidator<UpdateLectureRequest>
    {
        public UpdateLectureRequestValidator()
        {
            RuleFor(x => x.LectureId)
                .NotEmpty().WithMessage("LectureId is required");
            RuleFor(x => x.SectionId)
                .NotEmpty().WithMessage("SectionId is required");
            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Title is required")
                .MaximumLength(50).WithMessage("Title cannot be longer than 50 characters");
            RuleFor(x => x.Content)
                .NotEmpty().WithMessage("Content is required");
            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("Description is required");
            RuleFor(x => x.Duration)
                .NotEmpty().WithMessage("Duration is required")
                .GreaterThanOrEqualTo(0).WithMessage("Duration must be greater than or equal to 0");
        }
    }

    public class CreateNewsRequest
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public string ImageUrl { get; set; }
    }

    public class CreateNewsRequestValidator : AbstractValidator<CreateNewsRequest>
    {
        public CreateNewsRequestValidator()
        {
            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Title is required")
                .MaximumLength(255).WithMessage("Title cannot be longer than 255 characters");
            RuleFor(x => x.Content)
                .NotEmpty().WithMessage("Content is required");
            RuleFor(x => x.ImageUrl)
                .MaximumLength(255).WithMessage("ImageUrl cannot be longer than 255 characters");
        }
    }

    public class UpdateNewsRequest
    {
        public int NewsId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string ImageUrl { get; set; }
    }

    public class UpdateNewsRequestValidator : AbstractValidator<UpdateNewsRequest>
    {
        public UpdateNewsRequestValidator()
        {
            RuleFor(x => x.NewsId)
                .NotEmpty().WithMessage("NewsId is required");
            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Title is required")
                .MaximumLength(255).WithMessage("Title cannot be longer than 255 characters");
            RuleFor(x => x.Content)
                .NotEmpty().WithMessage("Content is required");
            RuleFor(x => x.ImageUrl)
                .MaximumLength(255).WithMessage("ImageUrl cannot be longer than 255 characters");
        }
    }

    public class CreateNotificationRequest
    {
        public string Title { get; set; }
        public string Message { get; set; }
        public bool IsGlobal { get; set; }
    }

    public class CreateNotificationRequestValidator : AbstractValidator<CreateNotificationRequest>
    {
        public CreateNotificationRequestValidator()
        {
            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Title is required")
                .MaximumLength(255).WithMessage("Title cannot be longer than 255 characters");
            RuleFor(x => x.Message)
                .NotEmpty().WithMessage("Message is required");
            RuleFor(x => x.IsGlobal)
                .NotEmpty().WithMessage("IsGlobal is required");
        }
    }

    public class UpdateNotificationRequest
    {
        public int NotificationId { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
        public bool IsGlobal { get; set; }
        public bool IsActive { get; set; }
    }

    public class UpdateNotificationRequestValidator : AbstractValidator<UpdateNotificationRequest>
    {
        public UpdateNotificationRequestValidator()
        {
            RuleFor(x => x.NotificationId)
                .NotEmpty().WithMessage("NotificationId is required");
            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Title is required")
                .MaximumLength(255).WithMessage("Title cannot be longer than 255 characters");
            RuleFor(x => x.Message)
                .NotEmpty().WithMessage("Message is required");
            RuleFor(x => x.IsGlobal)
                .NotEmpty().WithMessage("IsGlobal is required");
            RuleFor(x => x.IsActive)
                .NotEmpty().WithMessage("IsActive is required");
        }
    }

    public class CreateOrderRequest
    {
        public string OrderId { get; set; }
        public decimal Amount { get; set; }
        public string PaymentMethod { get; set; }
        public string PaymentStatus { get; set; }
    }

    public class CreateOrderRequestValidator : AbstractValidator<CreateOrderRequest>
    {
        public CreateOrderRequestValidator()
        {
            RuleFor(x => x.OrderId)
                .NotEmpty().WithMessage("OrderId is required");
            RuleFor(x => x.Amount)
                .NotEmpty().WithMessage("Amount is required")
                .GreaterThanOrEqualTo(0).WithMessage("Amount must be greater than or equal to 0");
            RuleFor(x => x.PaymentMethod)
                .NotEmpty().WithMessage("PaymentMethod is required")
                .Must(method => new[] { "VnPay", "MoMo", "PayPal" }.Contains(method))
                .WithMessage("PaymentMethod must be VnPay, MoMo, or PayPal");
            RuleFor(x => x.PaymentStatus)
                .NotEmpty().WithMessage("PaymentStatus is required")
                .Must(status => new[] { "Success", "Failed", "Pending" }.Contains(status))
                .WithMessage("PaymentStatus must be Success, Failed, or Pending");
        }
    }
}