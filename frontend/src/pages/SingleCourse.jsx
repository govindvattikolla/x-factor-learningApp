import React, { useEffect, useState } from "react";
import axiosInstance from "../service/axiosInstance";
import { useParams } from "react-router-dom";

const SingleCourse = () => {
    const { id } = useParams();

    const [course, setCourse] = useState(null);
    const [videos, setVideos] = useState([]);
    const [purchased, setPurchased] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [progressMap, setProgressMap] = useState({});

    useEffect(() => {
        fetchCourse();
    }, []);

    const fetchCourse = async () => {
        try {
            const res = await axiosInstance.get(`/api/user/course/${id}`);

            setCourse(res.data.course);
            setPurchased(res.data.purchased);

            // add progress keys into videos with fallback
            const updatedVideos = res.data.videos.map(v => ({
                ...v,
                watchedPercentage: v.watchedPercentage || 0,
                isCompleted: v.isCompleted || false,
                lastWatchedAt: v.lastWatchedAt || 0,
            }));

            setVideos(updatedVideos);

            // create map for quick lookup
            const map = {};
            updatedVideos.forEach(v => {
                map[v.id] = {
                    watchedPercentage: v.watchedPercentage,
                    isCompleted: v.isCompleted,
                    lastWatchedAt: v.lastWatchedAt,
                };
            });
            setProgressMap(map);

            if (res.data.purchased && updatedVideos.length > 0) {
                setSelectedVideo(updatedVideos[0]);
            }

            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    // -----------------------------
    // SAVE PROGRESS TO BACKEND
    // -----------------------------
    const saveProgress = async (videoId, watchedPercentage, lastWatchedAt) => {
        try {
            await axiosInstance.put("/api/user/course/progress/update", {
                courseId: id,
                videoId,
                watchedPercentage,
                lastWatchedAt
            });

            // update UI instantly
            setProgressMap(prev => ({
                ...prev,
                [videoId]: {
                    watchedPercentage,
                    lastWatchedAt,
                    isCompleted: watchedPercentage >= 90
                }
            }));

        } catch (err) {
            console.log("Progress update failed:", err);
        }
    };

    // -----------------------------
    // AUTO SAVE EVERY 5 SECONDS
    // -----------------------------
    useEffect(() => {
        if (!purchased || !selectedVideo) return;

        const videoElement = document.getElementById("courseVideo");
        if (!videoElement) return;

        const interval = setInterval(() => {
            const currentTime = videoElement.currentTime || 0;
            const duration = videoElement.duration || 0;

            if (duration > 0) {
                const watchedPercentage = Math.round((currentTime / duration) * 100);
                saveProgress(selectedVideo.id, watchedPercentage, currentTime);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [selectedVideo, purchased]);

    // -----------------------------
    // BUY COURSE
    // -----------------------------
    const buyCourse = async () => {
        try {
            await axiosInstance.post(`/api/user/course/${id}/buy`, {
                paymentMethod: "upi",
            });

            alert("Course purchased successfully!");
            fetchCourse();
        } catch (error) {
            alert(error.response?.data?.error || "Failed to purchase");
        }
    };

    const getAssetUrl = (path) => {
        return path
            ? `${import.meta.env.VITE_BACKEND_URL ?? ''}/static/${path}`
            : 'https://via.placeholder.com/400x250';
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-xl">
                Loading...
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-4 mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT SIDE: VIDEO PLAYER */}
                <div className="lg:col-span-2">
                    <div className="bg-black rounded-lg overflow-hidden shadow-lg aspect-video relative">
                        {purchased && selectedVideo ? (
                            <video
                                id="courseVideo"
                                key={selectedVideo.id}
                                controls
                                className="w-full h-full object-contain"
                                src={selectedVideo.url}
                                poster={getAssetUrl(selectedVideo.thumbnailUrl)}
                                onLoadedMetadata={(e) => {
                                    const resumeTime = progressMap[selectedVideo.id]?.lastWatchedAt || 0;
                                    if (resumeTime > 0) {
                                        e.target.currentTime = resumeTime;
                                    }
                                }}
                            />
                        ) : (
                            <div className="w-full h-full relative">
                                <img
                                    src={getAssetUrl(course.thumbnailUrl)}
                                    alt="Course Thumbnail"
                                    className="w-full h-full object-cover opacity-80"
                                />
                                {!purchased && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white">
                                        <h2 className="text-3xl font-bold mb-4">Locked</h2>
                                        <button
                                            onClick={buyCourse}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold text-lg transition"
                                        >
                                            Buy Course to Watch
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="mt-6">
                        <h1 className="text-3xl font-bold">
                            {purchased && selectedVideo ? selectedVideo.title : course.title}
                        </h1>

                        {!purchased && (
                            <div className="flex items-center justify-between mt-4 bg-blue-50 p-4 rounded-lg border border-blue-200">
                                <span className="text-2xl font-semibold text-green-700">
                                    Price: ₹{course.price}
                                </span>
                                <button
                                    onClick={buyCourse}
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold"
                                >
                                    Buy Now
                                </button>
                            </div>
                        )}

                        <div className="mt-6">
                            <h3 className="text-xl font-semibold mb-2">About this course</h3>
                            <p className="text-gray-600 leading-relaxed">{course.description}</p>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE: VIDEO LIST */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                        <div className="p-4 bg-gray-50 border-b border-gray-200">
                            <h2 className="text-xl font-bold">Course Content</h2>
                            <p className="text-sm text-gray-500">{videos.length} Lessons</p>
                        </div>

                        <div className="max-h-[600px] overflow-y-auto">
                            {videos.map((video, index) => (
                                <div
                                    key={video.id}
                                    onClick={() => {
                                        if (purchased) setSelectedVideo(video);
                                        else alert("Please buy the course to watch.");
                                    }}
                                    className={`
                                        p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition flex items-start gap-3 
                                        ${selectedVideo?.id === video.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''}
                                    `}
                                >

                                    {/* Progress Column */}
                                    <div className="mt-1 flex flex-col items-center w-10">
                                        {!purchased ? (
                                            <span className="text-red-500 text-sm">🔒</span>
                                        ) : progressMap[video.id]?.isCompleted ? (
                                            <span className="text-green-600 font-bold text-sm">✔</span>
                                        ) : (
                                            <span className="text-gray-600 text-sm">
                                                {progressMap[video.id]?.watchedPercentage || 0}%
                                            </span>
                                        )}
                                    </div>

                                    <div>
                                        <h4 className={`text-sm font-medium ${selectedVideo?.id === video.id ? 'text-blue-700' : 'text-gray-800'}`}>
                                            {video.title}
                                        </h4>
                                        <span className="text-xs text-gray-500">Video • {index + 1}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default SingleCourse;