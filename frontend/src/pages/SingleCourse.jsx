import React, { useEffect, useState } from "react";
import axiosInstance from "../service/axiosInstance";
import { useParams } from "react-router-dom";

const SingleCourse = () => {
    const { id } = useParams();

    const [course, setCourse] = useState(null);
    const [videos, setVideos] = useState([]);
    const [purchased, setPurchased] = useState(false);
    const [loading, setLoading] = useState(true);

    // State to track the currently playing video
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {
        fetchCourse();
    }, []);

    const fetchCourse = async () => {
        try {
            const res = await axiosInstance.get(`/api/user/course/${id}`);
            setCourse(res.data.course);
            setVideos(res.data.videos);
            setPurchased(res.data.purchased);

            // If purchased and videos exist, auto-select the first video
            if (res.data.purchased && res.data.videos.length > 0) {
                setSelectedVideo(res.data.videos[0]);
            }

            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const buyCourse = async () => {
        try {
            await axiosInstance.post(`/api/user/course/${id}/buy`, {
                paymentMethod: "upi",
            });

            alert("Course purchased successfully!");
            setPurchased(true);
            // Refresh data to unlock videos
            fetchCourse();
        } catch (error) {
            alert(error.response?.data?.error || "Failed to purchase");
        }
    };

    // Helper to construct URL
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
            {/* Grid Layout: Stacked on mobile, 3 columns on desktop (2 for player, 1 for list) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* --- LEFT SECTION: Video Player & Course Details --- */}
                <div className="lg:col-span-2">
                    <div className="bg-black rounded-lg overflow-hidden shadow-lg aspect-video relative">
                        {purchased && selectedVideo ? (
                            <video
                                // Key is important: forces react to reload element when video changes
                                key={selectedVideo.id}
                                controls
                                className="w-full h-full object-contain"
                                src={selectedVideo.url} // Assuming video object has a 'url' property
                                poster={getAssetUrl(selectedVideo.thumbnailUrl)}
                            >
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            // Show Course Thumbnail/Promo if not purchased or no video selected
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
                        <h1 className="text-3xl font-bold">{purchased && selectedVideo ? selectedVideo.title : course.title}</h1>

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

                {/* --- RIGHT SECTION: Course Content (Playlist) --- */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                        <div className="p-4 bg-gray-50 border-b border-gray-200">
                            <h2 className="text-xl font-bold">Course Content</h2>
                            <p className="text-sm text-gray-500">{videos.length} Lessons</p>
                        </div>

                        {/* Scrollable List */}
                        <div className="max-h-[600px] overflow-y-auto">
                            {videos.map((video, index) => (
                                <div
                                    key={video.id}
                                    onClick={() => {
                                        if(purchased) setSelectedVideo(video);
                                        else alert("Please buy the course to watch.");
                                    }}
                                    className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition flex items-start gap-3 
                                        ${selectedVideo?.id === video.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''}
                                    `}
                                >
                                    <div className="mt-1">
                                        {purchased ? (
                                            <span className="text-gray-600">
                                                {selectedVideo?.id === video.id ? '▶' : (index + 1)}
                                            </span>
                                        ) : (
                                            <span className="text-red-500 text-sm">🔒</span>
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