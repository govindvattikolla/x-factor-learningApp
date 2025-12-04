import React, {useEffect, useState} from 'react';
import { Play, Clock, Award, MoreHorizontal, Star, LogOut, User as UserIcon } from 'lucide-react';
import {NavLink, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import axiosInstance from "@/service/axiosInstance.js";

const UserDashboard = () => {
    const navigate = useNavigate();
    const data = useSelector((state) => state.user);
    const [myCourse, setMyCourse] = useState([]);
    const [stats,setStats] = useState({
        "totalEnrolledCourses": 0,
        "totalCompletedCourses": 0,
        "totalVideos": 0,
        "totalCompletedVideos": 0
    });

    const fetchData=async ()=>{
        const fetchData=await axiosInstance.get("/api/user/dashboard");
        setMyCourse(fetchData.data.courses);
        setStats(fetchData.data.stats);
    };

    useEffect(() => {
        fetchData().then((res)=>{
            console.log(res);
        })
    }, []);
    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-gray-900">Welcome back, {data.name}! 👋</h1>
                    <p className="mt-2 text-gray-600">You have {stats.totalEnrolledCourses-stats.totalCompletedCourses} courses in progress. Keep it up!</p>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                            <Play size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Courses In Progress</p>
                            <p className="text-xl font-bold text-gray-900">{stats.totalEnrolledCourses-stats.totalCompletedCourses}</p>
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
                    {/*<div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">*/}
                    {/*    <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">*/}
                    {/*        <Clock size={24} />*/}
                    {/*    </div>*/}
                    {/*    <div>*/}
                    {/*        <p className="text-sm text-gray-500">Learning Hours</p>*/}
                    {/*        <p className="text-xl font-bold text-gray-900">24.5</p>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
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
                        {myCourse.map((course) => (
                            <div key={course.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
                                <div className="relative h-48 bg-gray-200 overflow-hidden">
                                    <img src={(import.meta.env.VITE_BACKEND_URL ?? '' )+'/static/'+course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
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
                                        <button className="text-sm font-semibold text-blue-600 hover:text-blue-700" onClick={()=>navigate("course/"+course.id)} >
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