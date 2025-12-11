'use client';

import React, { useEffect, useState } from 'react';
import { Play, Award, MoreHorizontal } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import axiosInstance from "@/service/axiosInstance";
import Image from "next/image";

const UserDashboard = () => {
    const router = useRouter();
    const data = useSelector((state) => state.user);

    const [myCourse, setMyCourse] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalEnrolledCourses: 0,
        totalCompletedCourses: 0,
        totalVideos: 0,
        totalCompletedVideos: 0
    });

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get("/api/user/dashboard",{
                withCredentials: true
            });
            setMyCourse(response.data.courses || []);
            setStats(response.data.stats || {
                totalEnrolledCourses: 0,
                totalCompletedCourses: 0,
                totalVideos: 0,
                totalCompletedVideos: 0
            });
            setLoading(false);
        } catch (error) {
            console.error("Error fetching dashboard data", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log("Fetching dashboard data");
        fetchData();
    }, [data]);

    if (loading) {
        return <div className="flex h-screen items-center justify-center">Loading Dashboard...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-gray-900">Welcome back, {data?.name || 'Student'}! 👋</h1>
                    <p className="mt-2 text-gray-600">
                        You have {stats.totalEnrolledCourses - stats.totalCompletedCourses} courses in progress. Keep it up!
                    </p>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                            <Play size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Courses In Progress</p>
                            <p className="text-xl font-bold text-gray-900">
                                {stats.totalEnrolledCourses - stats.totalCompletedCourses}
                            </p>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                            <Award size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Certificates Earned</p>
                            <p className="text-xl font-bold text-gray-900">{stats.totalCompletedCourses}</p>
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

                    {myCourse.length === 0 ? (
                        <div className="text-center py-10 text-gray-500">No courses found. Start learning today!</div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {myCourse.map((course) => {
                                const imgSrc = course.thumbnail ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/static/${course.thumbnail}`
                                    : 'https://via.placeholder.com/400x225';

                                return (
                                    <div key={course.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
                                        <div className="relative h-48 bg-gray-200 overflow-hidden">
                                            {/* 3. Next.js Image Component */}
                                            <Image
                                                src={imgSrc}
                                                alt={course.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                unoptimized={imgSrc.startsWith('http')}
                                            />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                                            <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm transform scale-75 group-hover:scale-100 transition-all">
                                                    <Play className="ml-1 text-blue-600" size={20} fill="currentColor" onClick={() => router.push(`/dashboard/course/${course.id}`)} />
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
                                                <button
                                                    className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                                                    // 2. Fixed Navigation
                                                    onClick={() => router.push(`/dashboard/course/${course.id}`)}
                                                >
                                                    {course.progress === 0 ? 'Start Course' : 'Continue Learning'}
                                                </button>
                                                <button className="text-gray-400 hover:text-gray-600">
                                                    <MoreHorizontal size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

            </main>
        </div>
    );
};

export default UserDashboard;