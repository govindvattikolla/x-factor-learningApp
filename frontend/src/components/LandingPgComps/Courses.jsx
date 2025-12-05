import React from "react";
import img2 from "@/assets/about-img2.jpg";
import img3 from "@/assets/about_img3.jpg";

const CoursesSection2 = () => {
    const courses = [
        {
            id: 1,
            title: "15-Days 5-Skills",
            description: [
                "LinkedIn Profile Creation and Optimization",
                "Foundation of Generative AI",
                "Foundation of LLMs",
                "Foundation of Prompt Engineering",
                "7+ AI Tools Bootcamp",
            ],
            duration: "4 weeks",
            image: img2,
            category: "AI Skills",
            comingSoon: true,
            featured: true,
            rating: 4.8,
            students: 120,
            level: "Beginner",
        },
        {
            id: 2,
            title: "Communication Sessions",
            description: [
                "Public Speaking Mastery",
                "Effective Business Writing",
                "Interpersonal Skills",
                "Negotiation Tactics",
                "Presentation Skills",
            ],
            duration: "6 weeks",
            image: img3,
            category: "Professional Skills",
            featured: true,
            rating: 4.9,
            students: 85,
            level: "Intermediate",
        },
        {
            id: 3,
            title: "Resume Building",
            description: [
                "ATS Optimization",
                "Keyword Strategy",
                "Formatting Best Practices",
                "Cover Letter Writing",
                "Portfolio Development",
            ],
            duration: "3 weeks",
            image: img3,
            category: "Career Development",
            featured: false,
            rating: 4.7,
            students: 200,
            level: "All Levels",
        },
        {
            id: 4,
            title: "LinkedIn Optimization",
            description: [
                "Profile Auditing",
                "Networking Strategies",
                "Content Creation",
                "Personal Branding",
                "Job Search Techniques",
            ],
            duration: "4 weeks",
            image:img2,
            category: "Digital Presence",
            featured: false,
            rating: 4.9,
            students: 150,
            level: "All Levels",
        },
    ];

    return (
        <section className="py-16 bg-white" id="courses">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h1 className="text-orange-500 uppercase font-bold tracking-wider mb-2">
                        Our Programs
                    </h1>
                    <h2 className="text-3xl font-bold mb-3 text-gray-900">
                        Accelerate Your Career Growth
                    </h2>
                    <p className="text-xl text-gray-600">
                        Comprehensive programs designed to help you stand out in today's
                        competitive job market
                    </p>
                </div>

                {/* Courses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {courses.map((course) => (
                        <div
                            key={course.id}
                            className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 flex flex-col h-full transform transition duration-300 hover:-translate-y-2 hover:shadow-xl max-w-[500px] mx-auto w-full"
                        >
                            {/* Image Header */}
                            <div className="relative">
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="w-full h-[180px] object-cover"
                                />

                                {/* Overlay: Coming Soon */}
                                {course.comingSoon && (
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                    <span className="text-white text-2xl font-bold">
                      Coming Soon
                    </span>
                                    </div>
                                )}

                                {/* Badges */}
                                {course.featured && (
                                    <span
                                        className="absolute top-2 right-2 bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded">
                    Featured
                  </span>
                                )}
                                <span
                                    className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                  {course.category}
                </span>
                            </div>

                            {/* Card Body */}
                            <div className="p-6 flex flex-col flex-grow">
                                {/* Meta Header */}
                                <div className="flex justify-between items-center mb-3">
                  <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {course.duration}
                  </span>
                                    <div className="flex items-center text-yellow-500 font-bold text-sm">
                                        {/* Star Icon SVG */}
                                        <svg
                                            className="w-4 h-4 mr-1 fill-current"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                        </svg>
                                        {course.rating || "N/A"}
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold mb-3 text-gray-800">
                                    {course.title}
                                </h3>

                                {/* Description List */}
                                <ul className="list-disc pl-5 mb-4 text-gray-600 text-sm space-y-1 flex-grow">
                                    {course.description.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>

                                {/* Bottom Meta */}
                                <div
                                    className="flex justify-between items-center mt-auto text-sm text-gray-500 border-t pt-4 border-gray-100">
                                    <span>{course.students || 0} students</span>
                                    <span>{course.level || "General"}</span>
                                </div>
                            </div>

                            {/* Card Footer Button */}
                            <div className="p-4 bg-white border-t border-gray-100">
                                <button
                                    className="w-full block text-center border border-blue-600 text-blue-600 font-semibold py-2 rounded hover:bg-blue-600 hover:text-white transition duration-300">
                                    Enroll Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                    <p className="text-xl text-gray-600 mb-6">
                        Not sure which course is right for you?
                    </p>
                    <button
                        className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md">
                        Schedule a Free Consultation
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CoursesSection2;