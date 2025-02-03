const courseData: ICourse[] = [
    {
        courseId: 200001,
        imageURL: "https://example.com/project-management.jpg",
        title: "Project Management",
        duration: 2,
        price: 100,
        difficultyLevel: "Beginner",
        description: "Learn the fundamentals of project management, including planning, execution, and monitoring.",
        createdBy: "Anthony",
        createdAt: "2024-01-10T09:00:00Z",
        discount: {
            discountType: "percentage",
            discountValue: 10,
            calculatedDiscount: 10, // 10% of 100
            calculatedPrice: 90,
        },
        review: {
            averageRating: 4.5,
            totalRatings: 120,
        },
        instructors: [
            {
                userName: "Anthony",
                email: "anthony@example.com",
                image: "https://example.com/anthony.jpg",
            },
        ],
        enrollment: {
            totalEnrollments: 500,
        },
        lessons: [
            { lessonId: 101, title: "Introduction to Project Management", duration: "30m", rating: 4.6, reviews: 50, description: "Basic concepts of project management." },
            { lessonId: 102, title: "Planning & Scheduling", duration: "45m", rating: 4.7, reviews: 70, description: "Learn about project timelines." },
            { lessonId: 103, title: "Risk Management", duration: "45m", rating: 4.8, reviews: 60, description: "Managing risks effectively in projects." },
        ],
    },
    {
        courseId: 200002,
        imageURL: "https://example.com/web-development.jpg",
        title: "Web Development",
        duration: 3.5,
        price: 150,
        difficultyLevel: "Intermediate",
        description: "Master front-end and back-end development using modern web technologies.",
        createdBy: "Sophia",
        createdAt: "2024-02-05T10:30:00Z",
        discount: {
            discountType: "percentage",
            discountValue: 15,
            calculatedDiscount: 22.5, // 15% of 150
            calculatedPrice: 127.5,
        },
        review: {
            averageRating: 4.7,
            totalRatings: 200,
        },
        instructors: [
            {
                userName: "Sophia",
                email: "sophia@example.com",
                image: "https://example.com/sophia.jpg",
            },
        ],
        enrollment: {
            totalEnrollments: 800,
        },
        lessons: [
            { lessonId: 201, title: "HTML & CSS Basics", duration: "1h", rating: 4.7, reviews: 100, description: "Learn the structure of web pages." },
            { lessonId: 202, title: "JavaScript & DOM", duration: "1h 30m", rating: 4.8, reviews: 120, description: "Add interactivity to websites." },
            { lessonId: 203, title: "Backend with Node.js", duration: "1h", rating: 4.6, reviews: 80, description: "Server-side development basics." },
        ],
    },
    {
        courseId: 200003,
        imageURL: "https://example.com/data-analysis.jpg",
        title: "Data Analysis",
        duration: 4,
        price: 200,
        difficultyLevel: "Advanced",
        description: "Analyze data using Python, SQL, and visualization tools.",
        createdBy: "Michael",
        createdAt: "2024-03-12T08:45:00Z",
        discount: {
            discountType: "fixed",
            discountValue: 20,
            calculatedDiscount: 20,
            calculatedPrice: 180,
        },
        review: {
            averageRating: 4.8,
            totalRatings: 350,
        },
        instructors: [
            {
                userName: "Michael",
                email: "michael@example.com",
                image: "https://example.com/michael.jpg",
            },
        ],
        enrollment: {
            totalEnrollments: 600,
        },
        lessons: [
            { lessonId: 301, title: "Data Cleaning", duration: "1h", rating: 4.9, reviews: 150, description: "Prepare raw data for analysis." },
            { lessonId: 302, title: "SQL for Analysis", duration: "1h 30m", rating: 4.8, reviews: 140, description: "Query databases efficiently." },
            { lessonId: 303, title: "Data Visualization", duration: "1h 30m", rating: 4.7, reviews: 160, description: "Present data effectively." },
        ],
    },
    {
        courseId: 200004,
        imageURL: "https://example.com/graphic-design.jpg",
        title: "Graphic Design",
        duration: 2.5,
        price: 120,
        difficultyLevel: "Beginner",
        description: "Create stunning visuals using Photoshop, Illustrator, and InDesign.",
        createdBy: "Emma",
        createdAt: "2024-04-18T11:15:00Z",
        discount: {
            discountType: "percentage",
            discountValue: 5,
            calculatedDiscount: 6,
            calculatedPrice: 114,
        },
        review: {
            averageRating: 4.6,
            totalRatings: 180,
        },
        instructors: [
            {
                userName: "Emma",
                email: "emma@example.com",
                image: "https://example.com/emma.jpg",
            },
        ],
        enrollment: {
            totalEnrollments: 450,
        },
        lessons: [
            { lessonId: 401, title: "Typography Basics", duration: "45m", rating: 4.7, reviews: 80, description: "Understanding font styles." },
            { lessonId: 402, title: "Color Theory", duration: "45m", rating: 4.8, reviews: 90, description: "Mastering color combinations." },
            { lessonId: 403, title: "Photoshop Basics", duration: "1h", rating: 4.6, reviews: 100, description: "Learn Photoshop tools." },
        ],
    }
];

export default courseData;
