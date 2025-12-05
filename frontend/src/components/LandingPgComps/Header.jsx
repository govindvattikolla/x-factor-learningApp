import React from "react";
import backgroundImage from "../../assets/header_image1.jpg";

export default function Header2() {
    return (
        <section
            id="home"
            className="relative flex items-center justify-center h-[600px] lg:h-[80vh] bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="absolute inset-0 bg-black/50"></div>

            <div className="relative z-10 container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                    Unlock Your Potential with XFactor
                </h1>
                <p className="text-lg md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
                    Join our platform and master new skills with expert-led courses.
                </p>
                <a
                    href="#"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition duration-300 transform hover:scale-105"
                >
                    Get Started
                </a>
            </div>
        </section>
    );
}