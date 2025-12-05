import React from "react";
import aboutImg from "../../assets/about_img3.jpg";

const AboutSection2 = () => {
    return (
        <section className="py-16 bg-gray-50" id="about">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center">

                    {/* Image Column */}
                    <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
                        <div className="relative">
                            <img
                                src={aboutImg}
                                alt="Students learning online"
                                className="w-full rounded-lg shadow-lg object-cover"
                            />
                            {/* Optional: Decorative accent behind image */}
                            <div className="absolute -z-10 top-4 -left-4 w-full h-full bg-orange-100 rounded-lg hidden md:block"></div>
                        </div>
                    </div>

                    {/* Content Column */}
                    <div className="w-full lg:w-1/2 lg:pl-12">
                        <div className="text-left">
                            <h2 className="text-orange-500 uppercase font-bold tracking-wider mb-2">
                                About Us
                            </h2>
                            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                                Transform Your Future With Our Modern Learning Experience
                            </h3>
                            <p className="text-xl text-gray-600 mb-6">
                                We're dedicated to making education accessible, engaging, and
                                effective for learners worldwide.
                            </p>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Founded in 2025, our platform combines cutting-edge knowledge
                                with expert-led instruction to deliver high-quality courses
                                across various disciplines. Whether you're looking to advance
                                your career, acquire a new skill, or explore a passion, our
                                flexible learning environment is designed to help you succeed at
                                your own pace.
                            </p>

                            {/* Features Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 mb-8">
                                {[
                                    "Expert Instructors",
                                    "Flexible Learning",
                                    "Interactive Content",
                                    "Industry Recognized",
                                ].map((feature, index) => (
                                    <div key={index} className="flex items-center">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mr-3 text-white">
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        </div>
                                        <p className="mb-0 font-medium text-gray-700">{feature}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-wrap gap-4">
                                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300 shadow-md">
                                    Explore Courses
                                </button>
                                <button className="border border-gray-400 text-gray-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 hover:text-gray-900 transition duration-300">
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection2;