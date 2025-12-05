import React from "react";
import img3 from "@/assets/about_img3.jpg";

const ReviewsSection2 = () => {
    const reviews = [
        {
            id: 1,
            name: "Michael Chen",
            position: "Software Developer",
            company: "Tech Innovations",
            image: "/api/placeholder/100/100", // Replace with real paths if available
            course: "Fundamentals of Prompts",
            text: "This course completely transformed my approach to working with AI. The prompt engineering techniques I learned have made me significantly more productive at work. Our team now uses these methods for all our AI interactions.",
            rating: 5,
            date: "January 15, 2025",
        },
        {
            id: 2,
            name: "Priya Sharma",
            position: "Marketing Manager",
            company: "Global Brands Inc.",
            image: "/api/placeholder/100/100",
            course: "Communication Sessions",
            text: "The communication sessions helped me overcome my anxiety about public speaking. The instructor provided personalized feedback that addressed my specific challenges. I've since led three successful product launches with confidence.",
            rating: 5,
            date: "December 8, 2024",
        },
        {
            id: 3,
            name: "James Wilson",
            position: "Recent Graduate",
            company: "University of Technology",
            image: img3,
            course: "Resume Building",
            text: "After struggling for months to get interviews, I took this resume building course and everything changed. Within two weeks of updating my resume with the techniques taught, I received callbacks from 5 companies and landed my dream job!",
            rating: 5,
            date: "February 3, 2025",
        },
        {
            id: 4,
            name: "Sophia Rodriguez",
            position: "Freelance Consultant",
            company: "Self-employed",
            image: "/api/placeholder/100/100",
            course: "LinkedIn Optimization",
            text: "The LinkedIn Optimization course was a game-changer for my freelance business. I've seen a 200% increase in inbound leads and have been able to raise my rates. The instructor's insights on content strategy were particularly valuable.",
            rating: 4,
            date: "January 22, 2025",
        },
    ];

    // Function to render star SVGs based on rating
    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`w-5 h-5 mr-1 ${
                    i < rating ? "text-yellow-400" : "text-gray-300"
                }`}
            >
                <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                />
            </svg>
        ));
    };

    return (
        <section className="py-16 bg-gray-50" id="reviews">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="mb-12 text-center max-w-3xl mx-auto">
                    <h2 className="text-orange-500 uppercase font-bold tracking-wider mb-2">
                        Student Reviews
                    </h2>
                    <h3 className="text-3xl font-semibold mb-3 text-gray-900">
                        What Our Students Say
                    </h3>
                    <p className="text-xl text-gray-600">
                        Hear from professionals who have transformed their careers with our
                        courses
                    </p>
                </div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className="bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col h-full transition-shadow duration-300 hover:shadow-md"
                        >
                            <div className="p-6 flex-grow">
                                {/* Stars */}
                                <div className="flex mb-3">{renderStars(review.rating)}</div>

                                {/* Text */}
                                <p className="text-gray-700 mb-6 italic">"{review.text}"</p>

                                {/* User Info */}
                                <div className="flex items-center mt-auto">
                                    <img
                                        src={review.image}
                                        alt={review.name}
                                        className="w-16 h-16 rounded-full object-cover mr-4 border border-gray-200"
                                    />
                                    <div>
                                        <h5 className="font-semibold text-gray-900 leading-tight">
                                            {review.name}
                                        </h5>
                                        <p className="text-sm text-gray-500 leading-tight">
                                            {review.position}
                                        </p>
                                        <small className="text-orange-500 font-medium block mt-1">
                                            {review.course}
                                        </small>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="px-6 py-3 bg-white border-t border-gray-100 rounded-b-lg">
                                <small className="text-gray-400">Posted on {review.date}</small>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats Section */}
                <div className="mt-16">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                            <div className="px-4 text-center">
                                <h3 className="text-3xl font-bold text-blue-600 mb-1">100+</h3>
                                <p className="text-gray-600">Satisfied Students</p>
                            </div>
                            <div className="px-4 text-center">
                                <h3 className="text-3xl font-bold text-blue-600 mb-1">4.8</h3>
                                <p className="text-gray-600">Average Rating</p>
                            </div>
                            <div className="px-4 text-center">
                                <h3 className="text-3xl font-bold text-blue-600 mb-1">92%</h3>
                                <p className="text-gray-600">Completion Rate</p>
                            </div>
                            <div className="px-4 text-center">
                                <h3 className="text-3xl font-bold text-blue-600 mb-1">87%</h3>
                                <p className="text-gray-600">Career Advancement</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReviewsSection2;