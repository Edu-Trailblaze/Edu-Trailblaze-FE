CREATE DATABASE EduTrailblazeDb
GO

USE EduTrailblazeDb
GO

-- Users Table
CREATE TABLE Users (
    UserId INT IDENTITY PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Email NVARCHAR(255) UNIQUE NOT NULL,
    PasswordHash NVARCHAR(255) NOT NULL,
    Role NVARCHAR(50) NOT NULL CHECK (Role IN ('Student', 'Instructor', 'Admin')),
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    IsActive BIT DEFAULT 1,
    IsDeleted BIT DEFAULT 0
);
GO

CREATE TABLE UserProfiles (
	UserId INT PRIMARY KEY,
	[Address] NVARCHAR(MAX),
	ProfilePictureUrl NVARCHAR(MAX),
	Balance DECIMAL(10, 2) DEFAULT 0,
	FOREIGN KEY (UserId) REFERENCES Users(UserId)
);

-- Languages Table
CREATE TABLE Languages (
    LanguageId INT IDENTITY PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL
);
GO

-- Tags Table
CREATE TABLE Tags (
    TagId INT IDENTITY PRIMARY KEY,
    Name NVARCHAR(50) UNIQUE NOT NULL,
    Description NVARCHAR(MAX),
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE()
);
GO

-- Courses Table
CREATE TABLE Courses (
    CourseId INT IDENTITY PRIMARY KEY,
    Title NVARCHAR(255) NOT NULL,
    ImageUrl NVARCHAR(MAX),
    Description NVARCHAR(MAX) NOT NULL,
    DifficultyLevel NVARCHAR(50) CHECK (DifficultyLevel IN ('Beginner', 'Intermediate', 'Advanced')),
    Prerequisites NVARCHAR(MAX),
    Price DECIMAL(10, 2),
    EstimatedCompletionTime DECIMAL(10, 2),
    CreatedBy INT NOT NULL FOREIGN KEY REFERENCES Users(UserId),
    UpdatedBy INT NOT NULL FOREIGN KEY REFERENCES Users(UserId),
    IsPublished BIT DEFAULT 0,
    IsDeleted BIT DEFAULT 0,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE()
);
GO

-- CourseLanguages Table
CREATE TABLE CourseLanguages (
    CourseId INT NOT NULL FOREIGN KEY REFERENCES Courses(CourseId),
    LanguageId INT NOT NULL FOREIGN KEY REFERENCES Languages(LanguageId),
    PRIMARY KEY (CourseId, LanguageId)
);
GO

-- CourseTags Table
CREATE TABLE CourseTags (
	CourseId INT NOT NULL FOREIGN KEY REFERENCES Courses(CourseId),
    TagId INT NOT NULL FOREIGN KEY REFERENCES Tags(TagId),
    PRIMARY KEY (CourseId, TagId)
);
GO

-- CourseInstructors Table
CREATE TABLE CourseInstructors (
    CourseId INT NOT NULL FOREIGN KEY REFERENCES Courses(CourseId),
    InstructorId INT NOT NULL FOREIGN KEY REFERENCES Users(UserId),
    IsPrimaryInstructor BIT DEFAULT 0,
    AssignedAt DATETIME DEFAULT GETDATE(),
	PRIMARY KEY(CourseId, InstructorId)
);
GO

-- Enrollments Table
CREATE TABLE Enrollments (
	EnrollmentId INT IDENTITY PRIMARY KEY,
    StudentId INT NOT NULL FOREIGN KEY REFERENCES Users(UserId),
    CourseId INT NOT NULL FOREIGN KEY REFERENCES Courses(CourseId),
    EnrolledAt DATETIME DEFAULT GETDATE(),
    ProgressPercentage DECIMAL(5, 2) DEFAULT 0,
    IsCompleted BIT DEFAULT 0,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE()
);
GO

-- Sections Table
CREATE TABLE Sections (
    SectionId INT IDENTITY PRIMARY KEY,
    CourseId INT NOT NULL FOREIGN KEY REFERENCES Courses(CourseId),
    Title NVARCHAR(255) NOT NULL,
    Description NVARCHAR(MAX),
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE()
);
GO

-- Lectures Table
CREATE TABLE Lectures (
    LectureId INT IDENTITY PRIMARY KEY,
    SectionId INT NOT NULL FOREIGN KEY REFERENCES Sections(SectionId),
    Title NVARCHAR(255) NOT NULL,
    Content NVARCHAR(MAX),
    Description NVARCHAR(MAX),
    Duration INT,
    IsDeleted BIT DEFAULT 0,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE()
);
GO

-- Videos Table
CREATE TABLE Videos (
    VideoId INT IDENTITY PRIMARY KEY,
    LectureId INT NOT NULL FOREIGN KEY REFERENCES Lectures(LectureId),
    Title NVARCHAR(255) NOT NULL,
    VideoUrl NVARCHAR(MAX),
    Transcript NVARCHAR(MAX),
    IsDeleted BIT DEFAULT 0,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE()
);
GO

-- Quizzes Table
CREATE TABLE Quizzes (
    QuizId INT IDENTITY PRIMARY KEY,
    LectureId INT NOT NULL FOREIGN KEY REFERENCES Lectures(LectureId),
    Title NVARCHAR(255) NOT NULL,
    PassingScore DECIMAL(5, 2),
    CreatedAt DATETIME DEFAULT GETDATE()
);
GO

-- Questions Table
CREATE TABLE Questions (
    QuestionId INT IDENTITY PRIMARY KEY,
    QuizId INT NOT NULL FOREIGN KEY REFERENCES Quizzes(QuizId),
    QuestionText NVARCHAR(MAX) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE()
);
GO

-- Answers Table
CREATE TABLE Answers (
    AnswerId INT IDENTITY PRIMARY KEY,
    QuestionId INT NOT NULL FOREIGN KEY REFERENCES Questions(QuestionId),
    AnswerText NVARCHAR(MAX) NOT NULL,
    IsCorrect BIT NOT NULL
);
GO

-- Certificates Table
CREATE TABLE Certificates (
    CertificateId INT IDENTITY PRIMARY KEY,
    CourseId INT NOT NULL FOREIGN KEY REFERENCES Courses(CourseId),
    CertificateTemplateUrl NVARCHAR(MAX),
	CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE()
);
GO

CREATE TABLE QuizHistory (
    QuizHistoryId INT PRIMARY KEY IDENTITY(1,1),
    UserId INT NOT NULL,                        
    QuizId INT NOT NULL,                        
    AttemptedOn DATETIME DEFAULT GETDATE(),     
    Score DECIMAL(5, 2),                      
    IsPassed BIT,                               
    DurationInSeconds INT,                      
    FOREIGN KEY (UserId) REFERENCES Users(UserId),
    FOREIGN KEY (QuizId) REFERENCES Quizzes(QuizId)
);
GO

CREATE TABLE QuizAnswers (
    QuizAnswerId INT PRIMARY KEY IDENTITY(1,1), 
    QuizHistoryId INT NOT NULL,                 
    QuestionId INT NOT NULL,                    
    UserAnswer NVARCHAR(255),                   
    IsCorrect BIT,                              
    FOREIGN KEY (QuizHistoryId) REFERENCES QuizHistory(QuizHistoryId),
    FOREIGN KEY (QuestionId) REFERENCES Questions(QuestionId)
);
GO

-- UserCertificates Table
CREATE TABLE UserCertificates (
    StudentId INT NOT NULL FOREIGN KEY REFERENCES Users(UserId),
    CertificateId INT NOT NULL FOREIGN KEY REFERENCES Certificates(CertificateId),
    IssueDate DATETIME DEFAULT GETDATE(),
    CertificateUrl NVARCHAR(MAX),
	PRIMARY KEY(StudentId, CertificateId)
);
GO

-- Notifications Table
CREATE TABLE Notifications (
    NotificationId INT IDENTITY PRIMARY KEY,
    Title NVARCHAR(MAX) NOT NULL,
    Message NVARCHAR(MAX) NOT NULL,
    IsGlobal BIT DEFAULT 0,
    CreatedAt DATETIME DEFAULT GETDATE()
);
GO

-- UserNotifications Table
CREATE TABLE UserNotifications (
	UserId INT NOT NULL FOREIGN KEY REFERENCES Users(UserId),
    NotificationId INT NOT NULL FOREIGN KEY REFERENCES Notifications(NotificationId),
	IsRead BIT DEFAULT 0,
    PRIMARY KEY (UserId, NotificationId)
);
GO

-- Discounts and Coupons Tables
CREATE TABLE Discounts (
    DiscountId INT IDENTITY PRIMARY KEY,
    DiscountType NVARCHAR(50) NOT NULL CHECK (DiscountType IN ('Percentage', 'Value')),
    DiscountValue DECIMAL(10, 2) NOT NULL,
    StartDate DATETIME NOT NULL,
    EndDate DATETIME NOT NULL,
	IsActive BIT DEFAULT 1
);
GO

CREATE TABLE CourseDiscounts (
    CourseId INT NOT NULL FOREIGN KEY REFERENCES Courses(CourseId),
    DiscountId INT NOT NULL FOREIGN KEY REFERENCES Discounts(DiscountId),
	PRIMARY KEY(CourseId, DiscountId)
);
GO

CREATE TABLE Coupons (
    CouponId INT IDENTITY PRIMARY KEY,
    Code NVARCHAR(50) UNIQUE NOT NULL,
    DiscountType NVARCHAR(50) NOT NULL CHECK (DiscountType IN ('Percentage', 'Value')),
    DiscountValue DECIMAL(10, 2) NOT NULL,
    ExpiryDate DATETIME NOT NULL,
    IsActive BIT DEFAULT 1
);
GO

CREATE TABLE CourseCoupons (
    CourseId INT NOT NULL FOREIGN KEY REFERENCES Courses(CourseId),
    CouponId INT NOT NULL FOREIGN KEY REFERENCES Coupons(CouponId),
	PRIMARY KEY(CourseId, CouponId)
);
GO

CREATE TABLE UserProgress (
    UserProgressId INT IDENTITY PRIMARY KEY,
    UserId INT NOT NULL FOREIGN KEY REFERENCES Users(UserId),
    CourseId INT NOT NULL FOREIGN KEY REFERENCES Courses(CourseId),
    SectionId INT NULL FOREIGN KEY REFERENCES Sections(SectionId),
    LectureId INT NULL FOREIGN KEY REFERENCES Lectures(LectureId),
    QuizId INT NULL FOREIGN KEY REFERENCES Quizzes(QuizId),
    ProgressType NVARCHAR(50) NOT NULL CHECK (ProgressType IN ('Course', 'Section', 'Lecture', 'Quiz')),
    ProgressPercentage DECIMAL(5, 2) DEFAULT 0 CHECK (ProgressPercentage BETWEEN 0 AND 100),
    IsCompleted BIT DEFAULT 0,
    LastAccessed DATETIME DEFAULT GETDATE(),
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE()
);
GO

CREATE TABLE Reviews (
    ReviewId INT IDENTITY PRIMARY KEY,
    CourseId INT NOT NULL FOREIGN KEY REFERENCES Courses(CourseId),
    UserId INT NOT NULL FOREIGN KEY REFERENCES Users(UserId),
    Rating DECIMAL(2, 1) CHECK (Rating BETWEEN 0 AND 5) NOT NULL,
    Review NVARCHAR(MAX),
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    IsDeleted BIT DEFAULT 0
);
GO

CREATE TABLE News (
    NewsId INT IDENTITY PRIMARY KEY,
    Title NVARCHAR(255) NOT NULL,
    Content NVARCHAR(MAX) NOT NULL,
    ImageUrl NVARCHAR(MAX),
    PublishedAt DATETIME DEFAULT GETDATE(),
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE()
);
GO

CREATE TABLE Orders (
    OrderId INT IDENTITY PRIMARY KEY,
	UserId INT NOT NULL FOREIGN KEY REFERENCES Users(UserId),
    OrderAmount DECIMAL(10, 2) NOT NULL,
    OrderDate DATETIME DEFAULT GETDATE(),
    OrderStatus NVARCHAR(50) CHECK (OrderStatus IN ('Pending', 'Processing', 'Cancelled')) NOT NULL,
);
GO

CREATE TABLE OrderDetails (
    OrderId INT NOT NULL FOREIGN KEY REFERENCES Orders(OrderId),
    CourseId INT NOT NULL FOREIGN KEY REFERENCES Courses(CourseId),
    Price DECIMAL(10, 2) NOT NULL,
	PRIMARY KEY(OrderId, CourseId)
);
GO

CREATE TABLE Carts (
    CartId INT IDENTITY PRIMARY KEY,
	UserId INT NOT NULL FOREIGN KEY REFERENCES Users(UserId),
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE()
);
GO

CREATE TABLE CartItems (
    CartId INT NOT NULL FOREIGN KEY REFERENCES Carts(CartId),
    CourseId INT NOT NULL FOREIGN KEY REFERENCES Courses(CourseId),
	PRIMARY KEY(CartId, CourseId)
);
GO

CREATE TABLE Payments (
    PaymentId INT IDENTITY PRIMARY KEY,
    OrderId INT NOT NULL FOREIGN KEY REFERENCES Orders(OrderId),
    Amount DECIMAL(10, 2) NOT NULL,
    PaymentMethod NVARCHAR(50) CHECK (PaymentMethod IN ('VnPay', 'MoMo', 'PayPal')),
    PaymentStatus NVARCHAR(50) CHECK (PaymentStatus IN ('Success', 'Failed', 'Pending')),
    PaymentDate DATETIME DEFAULT GETDATE()
);
GO

CREATE TABLE Vouchers (
    VoucherId INT IDENTITY PRIMARY KEY,
    DiscountType NVARCHAR(50) NOT NULL CHECK (DiscountType IN ('Percentage', 'Value')),
    DiscountValue DECIMAL(10, 2) NOT NULL,
    IsUsed BIT DEFAULT 0,
    ExpiryDate DATETIME,
	OrderId INT UNIQUE,                    
    FOREIGN KEY (OrderId) REFERENCES Orders(OrderId) ON DELETE SET NULL
);
GO