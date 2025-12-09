'use client'
import {useRef, useState, useEffect} from "react";
import {
    FaBars,
    FaLinkedin,
    FaInstagram,
    FaWhatsapp,
    FaFacebook,
    FaYoutube,
    FaHandshake,
    FaLightbulb,
    FaDatabase,
    FaRocket,
    FaMapMarkerAlt,
    FaEnvelope,
    FaPhone
} from 'react-icons/fa';
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const words = ["path", "pace", "potential", "XFACTOR"];
    const timelineRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('opacity-100', 'translate-y-0');
                        entry.target.classList.remove('opacity-0', 'translate-y-12');
                    }
                });
            },
            {threshold: 0.2}
        );

        const items = document.querySelectorAll('.timeline-item');
        items.forEach((item) => observer.observe(item));

        return () => items.forEach((item) => observer.unobserve(item));
    }, []);

    const getImageSrc = (img) => {
        if (img.startsWith('http')) return img;
        return `/${img.startsWith('/') ? img.slice(1) : img}`;
    };

    return (
        <div className="font-sans text-gray-800">
            <header
                className="fixed top-0 w-full z-50 bg-white shadow-sm flex justify-between items-center px-6 py-4 md:px-10">
                <div className="logo">
                    <Image
                        src="/XFactor main logo.jpg"
                        alt="X-Factor Logo"
                        width={200}
                        height={64}
                        className="h-16 w-auto ml-0 md:ml-12 object-contain"
                        priority
                    />
                </div>

                <div
                    className="md:hidden text-2xl cursor-pointer"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <FaBars/>
                </div>


                <nav
                    className={`absolute top-full left-0 w-full bg-white shadow-md p-6 flex-col gap-4 transition-all duration-300 ease-in-out md:static md:w-auto md:bg-transparent md:shadow-none md:flex md:flex-row md:items-center md:gap-8 md:p-0 ${isMenuOpen ? 'flex' : 'hidden'}`}
                >
                    <ul className="flex flex-col gap-4 md:flex-row md:gap-8 list-none">
                        {['Home', 'About', 'Programs', 'Reviews', 'Contact Us'].map((item) => (
                            <li key={item}>
                                <a
                                    href={`#${item.toLowerCase().replace(' ', '')}`}
                                    className="relative font-medium text-black hover:text-orange-500 transition-colors after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-black hover:after:w-full after:transition-all after:duration-300"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <Link
                        href="/login"
                        className="bg-blue-500 text-white px-5 py-2 rounded-full font-medium hover:bg-black transition-colors w-fit mt-4 md:mt-0 md:mr-16"
                    >
                        Register Now
                    </Link>
                </nav>
            </header>

            <section
                id="home"
                // Fixed background path
                style={{backgroundImage: "url('/xfactor-header-img.jpg')"}}
                className="relative h-screen flex justify-center items-center text-white text-center bg-cover bg-center"
            >
                <div className="absolute inset-0 bg-black/60 z-0"></div>
                <div className="relative z-10">
                    <h1 className="text-4xl md:text-7xl font-extrabold mt-[-3rem]">
                        Your <span
                        key={currentWordIndex} // Added key to trigger animation
                        className="inline-block text-orange-400 animate-fade-in">
              {words[currentWordIndex]}
            </span>
                    </h1>
                </div>
            </section>

            <section id="about" className="py-16 px-5 bg-gray-50">
                <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-10">
                    <div className="w-full lg:w-1/2 relative h-[380px]">
                        <Image
                            src="/xfactor-about(rajesh).jpg"
                            alt="Learning Session"
                            fill // Use fill for responsive containers
                            className="rounded-lg shadow-lg object-cover"
                        />
                    </div>
                    <div className="flex-1 min-w-[300px]">
                        <h2 className="text-orange-500 font-bold text-2xl mb-2">ABOUT US</h2>
                        <h1 className="text-3xl font-bold mb-5 text-gray-900">Only a Student Truly Understands Another
                            Student</h1>
                        <p className="mb-4 text-gray-700 leading-relaxed text-lg">
                            Hi, I’m Rajesh — an entrepreneur and a lifelong learner. I know how challenging it can be to
                            start a new course or skill from scratch. That’s why I started X-Factor — to make learning
                            personal, practical, and student-friendly.
                        </p>
                        <p className="mb-4 text-gray-700 leading-relaxed text-lg">
                            At X-Factor, we don’t follow fixed curriculums. Instead, we connect with you personally,
                            understand your goals and skill level, and create a custom learning path just for you.
                            We&#39;re
                            here to guide you, every step of the way.
                        </p>
                        <p className="text-lg text-gray-600 mb-6">Start Your Learning Journey with X-Factor</p>
                        <div className="flex gap-4">
                            <a href="#programs"
                               className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-black transition-colors">
                                Explore Courses
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Approach / Timeline Section --- */}
            <section className="py-16 px-5 max-w-6xl mx-auto">
                <h2 className="text-center text-4xl font-bold text-orange-400 mb-2">Our Approach</h2>
                <p className="text-center text-gray-600 mb-12">Here’s how we define and handle our Learners</p>

                <div className="relative py-10" id="timeline" ref={timelineRef}>
                    <div
                        className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-yellow-300 hidden md:block z-0"></div>

                    {[
                        {
                            id: '01',
                            title: 'Connect With Us',
                            icon: <FaHandshake/>,
                            desc: 'Students reach out through our platform to begin their journey.',
                            color: 'bg-blue-500'
                        },
                        {
                            id: '02',
                            title: 'Understand You Better',
                            icon: <FaLightbulb/>,
                            desc: 'We take time to understand your current skills, goals, and learning preferences.',
                            color: 'bg-green-500'
                        },
                        {
                            id: '03',
                            title: 'Build Personalized Curriculum',
                            icon: <FaDatabase/>,
                            desc: 'We design a custom curriculum tailored to your level and goals.',
                            color: 'bg-orange-400'
                        },
                        {
                            id: '04',
                            title: 'Begin Your Learning Journey',
                            icon: <FaRocket/>,
                            desc: 'Your personalized learning starts with expert guidance and progress tracking.',
                            color: 'bg-red-500'
                        },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className={`timeline-item flex flex-col md:flex-row items-center justify-between mb-20 relative opacity-0 translate-y-12 transition-all duration-700 ease-out ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                        >
                            <div className={`
                hidden md:flex absolute left-1/2 top-[30%] transform -translate-x-1/2 -translate-y-1/2 z-10
                w-12 h-12 rounded-full text-white font-bold items-center justify-center text-lg shadow-md
                ${item.color}
              `}>
                                {item.id}
                            </div>

                            <div
                                className="w-full md:w-[45%] bg-white p-8 rounded-xl shadow-lg border-l-4 border-transparent hover:border-orange-400 transition-all group">
                                <h3 className="text-xl font-bold mb-3 flex items-center gap-2 group-hover:text-orange-400 transition-colors">
                                    <span
                                        className="group-hover:text-orange-400 transition-colors">{item.icon}</span> {item.title}
                                </h3>
                                <p className="text-gray-600 mb-4">{item.desc}</p>
                                <Link href="/form.htm" className="text-blue-500 font-medium hover:underline">Enroll Now
                                    →</Link>
                            </div>

                            <div className="w-full md:w-[45%]"></div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- Programs Section --- */}
            <section id="programs" className="py-16 px-5 text-center bg-white">
                <div className="mb-12">
                    <h2 className="text-orange-500 font-bold text-2xl mb-2">OUR PROGRAMS</h2>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Accelerate Your Career Growth</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">Comprehensive programs designed to help you stand out
                        in today's competitive job market</p>
                </div>

                <div className="flex flex-wrap justify-center gap-10">
                    {[
                        {
                            img: "xfactor-aboutus.jpg",
                            tag: "AI Skills",
                            title: "15-Days 5-Skills",
                            duration: "2 weeks",
                            overlay: "Coming Soon",
                            list: ["LinkedIn Profile Creation", "Foundation of Generative AI", "Foundation of LLMs", "Foundation of Prompt Engineering", "7+ AI Tools Bootcamp"]
                        },
                        {
                            img: "xfactor-communication.jpg",
                            tag: "Professional Skills",
                            title: "Impromptu Speaking Workshop",
                            duration: "2 weeks",
                            overlay: "Coming Soon",
                            list: ["Master thinking on your feet", "Real-time speaking practice", "Structure responses", "Overcome fear", "Peer feedback"]
                        },
                        {
                            img: "xafctor-ResumeBuilding.jpg",
                            tag: "Professional Skills",
                            title: "Resume Building Workshop",
                            duration: "1 week",
                            overlay: "Coming Soon",
                            list: ["Build professional resume", "Recruiter insights", "Highlight strengths", "Templates & Reviews", "ATS Optimization"]
                        },
                        {
                            img: "xfactor-aboutus.jpg",
                            tag: "Professional Skills",
                            title: "LinkedIn Optimization",
                            duration: "1 week",
                            overlay: false,
                            list: ["Create standout profile", "Compelling headlines", "Connection strategy", "Personal branding content", "Growth strategies"]
                        },
                        {
                            img: "xfactor-AiPrompt.jpg",
                            tag: "Professional Skills",
                            title: "Prompt Engineering Course",
                            duration: "1 week",
                            overlay: false,
                            list: ["Write effective prompts", "Interactive sessions", "Prompt structures", "Hands-on assignments", "Certification included"]
                        },
                        {
                            img: "xfactor-aiTool.jpg",
                            tag: "Professional Skills",
                            title: "AI Tools Bootcamp",
                            duration: "1 week",
                            overlay: false,
                            list: ["7+ Trending AI tools", "Productivity applications", "Live walkthroughs", "Content & Research", "Certificate included"]
                        },
                    ].map((prog, idx) => (
                        <div key={idx}
                             className="w-full md:w-[400px] bg-white rounded-xl shadow-lg overflow-hidden text-left hover:-translate-y-2 transition-transform duration-300 relative group">
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={getImageSrc(prog.img)}
                                    alt={prog.title}
                                    fill // Responsive fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <span
                                    className="absolute bottom-2 left-3 bg-blue-600 text-white px-2 py-1 text-xs font-bold rounded z-10">{prog.tag}</span>
                                <span
                                    className="absolute top-2 right-3 bg-yellow-400 text-white text-xs px-2 py-1 rounded font-bold z-10">Featured</span>
                                {prog.overlay && (
                                    <div
                                        className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xl font-bold pt-20 z-20">
                                        {prog.overlay}
                                    </div>
                                )}
                            </div>
                            <div className="p-5">
                                <span
                                    className="inline-block bg-gray-100 px-2 py-1 rounded text-sm font-semibold mb-3">{prog.duration}</span>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">{prog.title}</h3>
                                <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1 mb-6">
                                    {prog.list.map((li, lidx) => <li key={lidx}>{li}</li>)}
                                </ul>
                                <button
                                    onClick={() => window.open('https://chat.whatsapp.com/H5WNAqYSbBHLREG1JNvBGx', '_blank')}
                                    className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-black transition-colors"
                                >
                                    Join our community
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16">
                    <h4 className="text-xl font-semibold mb-4">Not sure which course is right for you?</h4>
                    <button
                        onClick={() => window.location.href = './form.htm'}
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-black transition-colors"
                    >
                        Schedule Free Consultation
                    </button>
                </div>
            </section>

            {/* --- Reviews Section --- */}
            <section id="reviews" className="py-16 px-5 bg-gray-50 text-center">
                <h2 className="text-4xl font-bold mb-2"><span className="text-orange-400">STUDENT REVIEWS</span><br/>What
                    Our Students Say</h2>
                <p className="text-gray-600 mb-10">Hear from professionals who have transformed their careers</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {[
                        {
                            name: "Jagadesh",
                            role: "B.tech student",
                            img: "https://via.placeholder.com/40",
                            text: "These sessions boosted my confidence and communication! Huge thanks to Rajesh and team.",
                            stars: "★★★★★"
                        },
                        {
                            name: "Govind",
                            role: "Software developer",
                            img: "govind profile pic 2.jpg",
                            text: "An incredible 15-day journey! I improved my speaking skills and learned to connect better.",
                            stars: "★★★★☆"
                        },
                        {
                            name: "Blessy",
                            role: "Content creator",
                            img: "https://via.placeholder.com/40",
                            text: "Rajesh's sessions on AI tools were amazing! Practical approach helped us solve real problems.",
                            stars: "★★★★★"
                        },
                        {
                            name: "Pushpa",
                            role: "Software Developer",
                            img: "https://via.placeholder.com/40",
                            text: "This 3-day workshop changed how I see AI! I learned it’s all about how you prompt.",
                            stars: "★★★★☆"
                        },
                    ].map((review, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-xl shadow-md text-left">
                            <div className="text-orange-400 text-xl mb-3">{review.stars}</div>
                            <p className="text-gray-800 text-sm mb-4">"{review.text}"</p>
                            <div className="flex items-center gap-3">
                                {/* Fixed Logic: Check if it's a placeholder (http) or local file */}
                                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                                    <Image
                                        src={getImageSrc(review.img)}
                                        alt={review.name}
                                        fill
                                        className="object-cover"
                                        unoptimized={review.img.startsWith('http')} // Allow external URLs without config
                                    />
                                </div>
                                <div className="text-sm">
                                    <strong className="block">{review.name}</strong>
                                    <span className="text-gray-500 block text-xs">{review.role}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- Recognized By --- */}
            <section className="py-10 bg-gray-50 overflow-hidden text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-8">Recognised By</h2>
                <div className="flex justify-center">
                    {/* Replaced with standard img for simple scroll animation without complex Next Image config */}
                    <img
                        src="/xfactor-MSME_img-removebg-preview.png"
                        alt="MSME Logo"
                        className="w-1/2 md:w-1/5 object-contain animate-scroll-img"
                    />
                </div>
            </section>

            {/* --- Metrics --- */}
            <section className="flex flex-wrap justify-center gap-10 py-10 bg-gray-100 text-center">
                {[
                    {val: '100+', label: 'Satisfied Students'},
                    {val: '4.8', label: 'Average Rating'},
                    {val: '92%', label: 'Completion Rate'},
                    {val: '87%', label: 'Career Advancement'},
                ].map((m, i) => (
                    <div key={i} className="text-gray-800">
                        <strong className="block text-3xl text-blue-600">{m.val}</strong>
                        <span className="text-sm">{m.label}</span>
                    </div>
                ))}
            </section>

            {/* --- Footer --- */}
            <footer id="contactUs" className="bg-[#1d1f23] text-white py-12 px-5">
                <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-8">
                    {/* Logo Col */}
                    <div className="flex-1 min-w-[250px]">
                        <Image
                            src="/XFactor main logo.jpg"
                            alt="Logo"
                            width={128}
                            height={50}
                            className="w-32 mb-4"
                        />
                        <p className="text-gray-400 text-sm mb-4">Empowering professionals through expert-led courses
                            designed to accelerate career growth.</p>
                        <div className="flex gap-4 text-xl text-gray-400">
                            <a href="https://www.linkedin.com/company/xfactorforstudents/" className="hover:text-white"><FaLinkedin/></a>
                            <a href="https://www.instagram.com/xfactor_2030/"
                               className="hover:text-white"><FaInstagram/></a>
                            <a href="https://chat.whatsapp.com/H5WNAqYSbBHLREG1JNvBGx"
                               className="hover:text-white"><FaWhatsapp/></a>
                            <a href="https://www.facebook.com/share/1B7wSr3Ae6/"
                               className="hover:text-white"><FaFacebook/></a>
                            <a href="https://www.youtube.com/@Rajeshbreakdowns"
                               className="hover:text-white"><FaYoutube/></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="flex-1 min-w-[200px]">
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="text-gray-400 space-y-2">
                            {['Home', 'About Us', 'Courses', 'Reviews', 'Contact'].map(link => (
                                <li key={link}><a href="#" className="hover:underline">{link}</a></li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="flex-1 min-w-[250px]">
                        <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                        <p className="text-gray-400 mb-2 flex items-center gap-2"><FaMapMarkerAlt/> Visakhapatnam</p>
                        <p className="text-gray-400 mb-2 flex items-center gap-2"><FaEnvelope/> team@thexfactor.in</p>
                        <p className="text-gray-400 mb-4 flex items-center gap-2"><FaPhone/> +91 7036426787</p>

                        <h4 className="text-lg font-semibold mb-2">Subscribe</h4>
                        <form className="flex">
                            <input type="email" placeholder="Your email"
                                   className="p-2 rounded-l-full w-full text-black outline-none" required/>
                            <button type="submit"
                                    className="bg-blue-600 px-4 py-2 rounded-r-full hover:bg-blue-700">Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-10 pt-5 text-center text-gray-500 text-sm">
                    <p>© 2025 XFACTOR. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}