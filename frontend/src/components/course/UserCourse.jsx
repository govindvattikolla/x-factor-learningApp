import React, { useState, useEffect } from 'react';
import axiosInstance from "../service/axiosInstance.js";

const CoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCourses = async (page) => {
        setLoading(true);
        try {
            const result = await axiosInstance.get(`/api/user/course?page=${page}`);
            if (result.data) {
                const coursesInfo=result.data;
                setCourses(coursesInfo.data);
                setPagination({
                    currentPage: coursesInfo.page,
                    totalPages: coursesInfo.totalPages,
                    totalItems: coursesInfo.total,
                });
            }
        } catch (err) {
            console.error(err);
            setError('Failed to load courses. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses(pagination.currentPage).then(r => console.log("fetched the courses info"));
    }, [pagination.currentPage]);


    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="text-red-500 font-semibold text-lg">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Explore Our Courses
                    </h1>
                    <p className="text-lg text-gray-600">
                        Found {pagination.totalItems} results
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course) => (
                        <div
                            key={course._id}
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
                        >
                            <div className="h-48 w-full relative bg-gray-200">
                                <img
                                    src={course.thumbnailUrl ? `${import.meta.env.VITE_BACKEND_URL ?? '' }/static/${course.thumbnailUrl}` : 'https://via.placeholder.com/400x250'}
                                    alt={course.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {e.target.src = 'https://via.placeholder.com/400x250'}}
                                />
                                <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-xs font-bold text-gray-700 shadow-sm">
                                    {new Date(course.createdAt).toLocaleDateString()}
                                </div>
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-xl font-bold text-gray-900 mb-2 capitalize">
                                    {course.title}
                                </h3>

                                <p className="text-gray-600 mb-4 text-sm flex-1 line-clamp-3">
                                    {course.description}
                                </p>


                                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                    <div>
                                        <span className="text-xs text-gray-500 block">Price</span>
                                        <span className="text-2xl font-bold text-green-600"> <span>    &#8377;</span> {course.price}</span>
                                    </div>
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                                        Enroll Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* PAGINATION */}
                {pagination.totalPages > 1 && (
                    <div className="flex justify-center items-center mt-12 space-x-4">
                        <button
                            disabled={pagination.currentPage === 1}
                            onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                            className={`px-4 py-2 rounded-md border ${
                                pagination.currentPage === 1
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                                    : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                            }`}
                        >
                            Previous
                        </button>

                        <span className="text-gray-700 font-medium">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>

                        <button
                            disabled={pagination.currentPage === pagination.totalPages}
                            onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                            className={`px-4 py-2 rounded-md border ${
                                pagination.currentPage === pagination.totalPages
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                                    : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                            }`}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CoursesPage;