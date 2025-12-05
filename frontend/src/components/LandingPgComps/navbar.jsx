import { useState } from "react";
import { Link } from "react-router-dom";
import main_title from "../../assets/XFactor_mainLogo.jpg";

export default function Navbar2() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50 w-full">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Logo Section */}
                    <div className="flex-shrink-0 flex items-center">
                        <a className="font-bold text-xl flex items-center" href="#">
                            <img
                                src={main_title}
                                alt="Logo"
                                className="h-[70px] mr-2"
                            />
                        </a>
                    </div>

                    {/* Desktop Menu Links - Hidden on small, Flex on Large */}
                    <div className="hidden lg:flex space-x-8">
                        {["Home", "About", "Programs", "Trainers", "Reviews", "Contact us"].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase().replace(" ", "")}`}
                                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-lg font-medium transition duration-300"
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    {/* Desktop Buttons - Hidden on small, Flex on Large */}
                    <div className="hidden lg:flex items-center space-x-4">
                        <Link
                            to="/login"
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-300"
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-300"
                        >
                            SignUp
                        </Link>
                    </div>

                    {/* Mobile Menu Button (Hamburger) */}
                    <div className="lg:hidden flex items-center">
                        <button
                            onClick={toggleNavbar}
                            type="button"
                            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
                        >
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                {isOpen ? (
                                    // Close Icon
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    // Hamburger Icon
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="lg:hidden bg-white shadow-lg border-t border-gray-100">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
                        {["Home", "About", "Programs", "Trainers", "Reviews", "Contact us"].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase().replace(" ", "")}`}
                                className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium"
                                onClick={() => setIsOpen(false)} // Close menu on click
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    {/* Mobile Buttons */}
                    <div className="pt-4 pb-4 flex flex-col items-center space-y-2">
                        <Link
                            to="/login"
                            className="w-3/4 bg-blue-600 text-white px-4 py-2 rounded text-center hover:bg-blue-700"
                            onClick={() => setIsOpen(false)}
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="w-3/4 bg-blue-600 text-white px-4 py-2 rounded text-center hover:bg-blue-700"
                            onClick={() => setIsOpen(false)}
                        >
                            SignUp
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}