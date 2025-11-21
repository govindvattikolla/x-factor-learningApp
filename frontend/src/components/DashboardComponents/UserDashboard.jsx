import React from 'react';
import { Play, Clock, Award, MoreHorizontal, Star, LogOut, User as UserIcon } from 'lucide-react';

const myCourses = [
    {
        _id: '1',
        title: 'Complete Web Development Bootcamp',
        thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=800&q=80',
        progress: 65,
        totalVideos: 45,
        completedVideos: 29
    },
    {
        _id: '2',
        title: 'Advanced React Patterns & Performance',
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
        progress: 10,
        totalVideos: 20,
        completedVideos: 2
    },
    {
        _id: '3',
        title: 'Node.js Backend Architecture',
        thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=800&q=80',
        progress: 100,
        totalVideos: 30,
        completedVideos: 30
    }
];

const UserDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center gap-8">
                            <div className="flex-shrink-0 flex items-center gap-2">
                                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <Play className="text-white fill-current" size={16} />
                                </div>
                                <span className="font-bold text-xl text-gray-900">LearnHub</span>
                            </div>
                            <div className="hidden sm:flex gap-6">
                                <a href="#" className="text-blue-600 border-b-2 border-blue-600 px-1 py-5 text-sm font-medium">My Learning</a>
                                <a href="#" className="text-gray-500 hover:text-gray-700 px-1 py-5 text-sm font-medium">Browse Courses</a>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-700 hidden md:block">John Doe</span>
                                <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                    <UserIcon size={20} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">

                {/* Welcome Section */}
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-gray-900">Welcome back, John! 👋</h1>
                    <p className="mt-2 text-gray-600">You have 2 courses in progress. Keep it up!</p>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                            <Play size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Courses In Progress</p>
                            <p className="text-xl font-bold text-gray-900">2</p>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                            <Award size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Certificates Earned</p>
                            <p className="text-xl font-bold text-gray-900">1</p>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
                            <Clock size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Learning Hours</p>
                            <p className="text-xl font-bold text-gray-900">24.5</p>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">My Courses</h2>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 bg-gray-900 text-white text-sm rounded-full">All</button>
                            <button className="px-3 py-1 bg-white border border-gray-200 text-gray-600 text-sm rounded-full hover:bg-gray-50">Active</button>
                            <button className="px-3 py-1 bg-white border border-gray-200 text-gray-600 text-sm rounded-full hover:bg-gray-50">Completed</button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {myCourses.map((course) => (
                            <div key={course._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
                                <div className="relative h-48 bg-gray-200 overflow-hidden">
                                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                                    <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm transform scale-75 group-hover:scale-100 transition-all">
                                            <Play className="ml-1 text-blue-600" size={20} fill="currentColor" />
                                        </div>
                                    </button>
                                </div>

                                <div className="p-5">
                                    <h3 className="font-bold text-gray-900 line-clamp-2 mb-3 h-12">
                                        {course.title}
                                    </h3>

                                    <div className="mb-4">
                                        <div className="flex justify-between text-xs mb-1.5 text-gray-500 font-medium">
                                            <span>{course.progress}% Complete</span>
                                            <span>{course.completedVideos}/{course.totalVideos} Lessons</span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full ${course.progress === 100 ? 'bg-green-500' : 'bg-blue-600'}`}
                                                style={{ width: `${course.progress}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                        <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                                            {course.progress === 0 ? 'Start Course' : 'Continue Learning'}
                                        </button>
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <MoreHorizontal size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </main>
        </div>
    );
};

export default UserDashboard;