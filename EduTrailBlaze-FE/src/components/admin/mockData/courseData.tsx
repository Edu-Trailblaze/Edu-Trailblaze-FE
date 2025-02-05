export const courseData = [
    {
        courseId: 1,
        imageURL: "/images/course1.jpg",
        title: "Mastering React & Next.js",
        duration: 12,
        price: 199.99,
        difficultyLevel: "Intermediate",
        description: "Learn React and Next.js from scratch and build dynamic web applications.",
        createdBy: "John Doe",
        createdAt: "2024-01-15T12:00:00Z",
        discount: {
            discountType: "Percentage",
            discountValue: 20,
            calculatedDiscount: 39.99,
            calculatedPrice: 159.99,
        },
        review: {
            averageRating: 4.8,
            totalRatings: 320,
        },
        instructors: [
            {
                userName: "John Doe",
                email: "john.doe@example.com",
                image: "/images/instructor1.jpg",
            },
        ],
        enrollment: {
            totalEnrollments: 1200,
        },
        lessons: [
            {
                lessonId: 1,
                title: "Introduction to React",
                duration: "45 minutes",
                rating: 4.7,
                reviews: 200,
                description: "Understand the basics of React and JSX syntax.",
            },
            {
                lessonId: 2,
                title: "State and Props in React",
                duration: "60 minutes",
                rating: 4.8,
                reviews: 180,
                description: "Learn how state and props work in React.",
            },
        ],
    },
    {
        courseId: 2,
        imageURL: "/images/course2.jpg",
        title: "Full-Stack JavaScript with Node.js",
        duration: 20,
        price: 249.99,
        difficultyLevel: "Advanced",
        description: "A comprehensive course covering both frontend and backend JavaScript.",
        createdBy: "Sarah Smith",
        createdAt: "2024-02-10T10:30:00Z",
        discount: {
            discountType: "Fixed",
            discountValue: 50,
            calculatedDiscount: 50,
            calculatedPrice: 199.99,
        },
        review: {
            averageRating: 4.9,
            totalRatings: 450,
        },
        instructors: [
            {
                userName: "Sarah Smith",
                email: "sarah.smith@example.com",
                image: "/images/instructor2.jpg",
            },
        ],
        enrollment: {
            totalEnrollments: 2000,
        },
        lessons: [
            {
                lessonId: 1,
                title: "JavaScript Fundamentals",
                duration: "50 minutes",
                rating: 4.9,
                reviews: 300,
                description: "Master JavaScript concepts essential for full-stack development.",
            },
            {
                lessonId: 2,
                title: "Building REST APIs with Node.js",
                duration: "70 minutes",
                rating: 4.8,
                reviews: 250,
                description: "Learn how to create RESTful APIs using Express and Node.js.",
            },
        ],
    },
    {
        courseId: 3,
        imageURL: "/images/course3.jpg",
        title: "UI/UX Design Principles",
        duration: 10,
        price: 149.99,
        difficultyLevel: "Beginner",
        description: "Understand the core principles of UI/UX design to create engaging interfaces.",
        createdBy: "Emily Johnson",
        createdAt: "2024-03-05T08:45:00Z",
        discount: {
            discountType: "Percentage",
            discountValue: 15,
            calculatedDiscount: 22.50,
            calculatedPrice: 127.49,
        },
        review: {
            averageRating: 4.7,
            totalRatings: 290,
        },
        instructors: [
            {
                userName: "Emily Johnson",
                email: "emily.johnson@example.com",
                image: "/images/instructor3.jpg",
            },
        ],
        enrollment: {
            totalEnrollments: 850,
        },
        lessons: [
            {
                lessonId: 1,
                title: "Introduction to UI/UX",
                duration: "40 minutes",
                rating: 4.6,
                reviews: 150,
                description: "Learn the basics of user interface and experience design.",
            },
            {
                lessonId: 2,
                title: "Wireframing and Prototyping",
                duration: "55 minutes",
                rating: 4.7,
                reviews: 140,
                description: "Understand how to create wireframes and interactive prototypes.",
            },
        ],
    },
];
