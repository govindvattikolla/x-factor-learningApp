import React from "react";

const Footer2 = () => {
    return (
        <footer className="bg-gray-900 text-white py-12" id="contact">
            <div className="container mx-auto px-4">
                {/* Main Grid: 1 col mobile, 2 col tablet, 4 col desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* 1. Logo and About Column */}
                    <div>
                        <div className="mb-4">
                            <img
                                src="../../src/assets/XFactor_mainLogo.jpg"
                                alt="XFactor Logo"
                                className="h-[150px] object-contain"
                            />
                        </div>
                        <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                            Empowering professionals through expert-led courses designed to
                            accelerate career growth and unlock new opportunities in today's
                            competitive job market.
                        </p>
                        {/* Social Icons */}
                        <div className="flex space-x-4">
                            {[
                                "linkedin",
                                "instagram",
                                "twitter", // X icon
                                "facebook",
                                "youtube",
                            ].map((platform, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="text-white hover:text-blue-500 transition-colors duration-300"
                                    aria-label={platform}
                                >
                                    {/* Rendering generic SVG icon based on platform for demo purposes */}
                                    <SocialIcon name={platform} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* 2. Quick Links Column */}
                    <div>
                        <h5 className="text-lg font-semibold mb-4 text-white">Quick Links</h5>
                        <ul className="space-y-2">
                            {["Home", "About Us", "Courses", "Blog", "Contact"].map((item) => (
                                <li key={item}>
                                    <a
                                        href={`#${item.toLowerCase().replace(" ", "")}`}
                                        className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
                                    >
                                        <ChevronRightIcon />
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 3. Courses Column */}
                    <div>
                        <h5 className="text-lg font-semibold mb-4 text-white">Our Courses</h5>
                        <ul className="space-y-2">
                            {[
                                "Fundamentals of Prompts",
                                "Communication Sessions",
                                "Resume Building",
                                "LinkedIn Optimization",
                                "All Courses",
                            ].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#courses"
                                        className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
                                    >
                                        <ChevronRightIcon />
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 4. Contact Info Column */}
                    <div>
                        <h5 className="text-lg font-semibold mb-4 text-white">Contact Us</h5>
                        <ul className="space-y-4 mb-6">
                            <li className="flex items-start">
                                <div className="text-blue-500 mt-1 mr-3">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                                </div>
                                <span className="text-gray-400">123 Education Street, Learning City, 10001</span>
                            </li>
                            <li className="flex items-center">
                                <div className="text-blue-500 mr-3">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                                </div>
                                <a href="mailto:govindvattikolla@gamil.com" className="text-gray-400 hover:text-white transition-colors">
                                    info@example.com
                                </a>
                            </li>
                            <li className="flex items-center">
                                <div className="text-blue-500 mr-3">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                                </div>
                                <a href="tel:+1234567890" className="text-gray-400 hover:text-white transition-colors">
                                    +1 (91) 567-890
                                </a>
                            </li>
                            <li className="flex items-start">
                                <div className="text-blue-500 mt-1 mr-3">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
                                </div>
                                <span className="text-gray-400">Monday - Friday: 9:00 AM - 6:00 PM</span>
                            </li>
                        </ul>

                        <h5 className="text-lg font-semibold mb-3 text-white">Subscribe</h5>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="w-full px-4 py-2 text-gray-900 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition duration-300">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Copyright Bar */}
                <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
                    <div className="text-gray-500 text-sm text-center md:text-left mb-4 md:mb-0">
                        &copy; 2025 XFACTOR. All rights reserved. Developed by govind
                    </div>
                    <div className="flex space-x-6 text-sm">
                        <a href="#" className="text-gray-500 hover:text-white transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-gray-500 hover:text-white transition-colors">
                            Terms of Service
                        </a>
                        <a href="#" className="text-gray-500 hover:text-white transition-colors">
                            Cookie Policy
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

// Helper component for the small arrow icon
const ChevronRightIcon = () => (
    <svg
        className="w-4 h-4 mr-2 text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
    </svg>
);

// Helper for Social Media Icons (SVG Paths)
const SocialIcon = ({ name }) => {
    const icons = {
        linkedin: <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />,
        facebook: <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />,
        instagram: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />,
        twitter: <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />,
        youtube: <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
    };
    return <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">{icons[name]}</svg>;
};

export default Footer2;