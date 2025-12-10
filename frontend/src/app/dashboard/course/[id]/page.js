'use client';

import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "@/service/axiosInstance";
import { useParams } from "next/navigation";
import Script from "next/script";
import Image from "next/image";
import Hls from "hls.js";

const SingleCourse = () => {
    const params = useParams();
    const id = params.id;

    const videoRef = useRef(null);

    const [course, setCourse] = useState(null);
    const [videos, setVideos] = useState([]);
    const [purchased, setPurchased] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [progressMap, setProgressMap] = useState({});

    // Fetch Course
    const fetchCourse = async () => {
        if (!id) return;
        try {
            const res = await axiosInstance.get(`/api/user/course/${id}`);

            setCourse(res.data.course);
            setPurchased(res.data.purchased);

            const updatedVideos = res.data.videos.map(v => ({
                ...v,
                watchedPercentage: v.watchedPercentage || 0,
                isCompleted: v.isCompleted || false,
                lastWatchedAt: v.lastWatchedAt || 0,
            }));

            setVideos(updatedVideos);

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
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourse();
    }, [id]);

    // Video Player Logic
    useEffect(() => {
        if (!selectedVideo) return;

        const video = videoRef.current;
        if (!video) return;

        // Cleanup previous HLS instance if exists
        let hls;

        if (Hls.isSupported()) {
            hls = new Hls();
            const link = `${process.env.NEXT_PUBLIC_BACKEND_URL}/static/${selectedVideo.url}`;
            hls.loadSource(link);
            hls.attachMedia(video);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                const resumeTime = progressMap[selectedVideo.id]?.lastWatchedAt || 0;
                if (resumeTime > 0) {
                    video.currentTime = resumeTime;
                }
                video.play().catch(e => console.log("Autoplay blocked", e));
            });

        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            // For Safari
            video.src = `${process.env.NEXT_PUBLIC_BACKEND_URL}/static/${selectedVideo.url}`;
            video.addEventListener("loadedmetadata", () => {
                const resumeTime = progressMap[selectedVideo.id]?.lastWatchedAt || 0;
                if (resumeTime > 0) video.currentTime = resumeTime;
            });
        }

        return () => {
            if (hls) hls.destroy();
        };
    }, [selectedVideo]);

    // Progress Saving Logic
    const saveProgress = async (videoId, watchedPercentage, lastWatchedAt) => {
        try {
            await axiosInstance.put("/api/user/course/progress/update", {
                courseId: id,
                videoId,
                watchedPercentage,
                lastWatchedAt
            });

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

    useEffect(() => {
        if (!purchased || !selectedVideo) return;

        const videoElement = videoRef.current; // Use ref instead of document.getElementById
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

    // Payment Logic
    const buyCourse = async () => {
        if (typeof window.Razorpay === 'undefined') {
            alert("Razorpay SDK failed to load. Please check your connection.");
            return;
        }

        try {
            const { data } = await axiosInstance.post(`/api/user/course/${id}/create-order`);

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Ensure this ENV is set
                amount: data.amount,
                currency: data.currency,
                name: data.courseName,
                order_id: data.orderId,
                handler: async function (response) {
                    try {
                        await axiosInstance.post("/api/user/payment/verify", {
                            ...response,
                            courseId: id,
                        });
                        alert("Payment successful!");
                        fetchCourse();
                    } catch (err) {
                        alert("Payment verification failed");
                    }
                },
                theme: {
                    color: "#0A74DA",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error("Payment initiation failed", error);
            alert("Failed to create order");
        }
    };

    const getAssetUrl = (path) => {
        return path
            ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/static/${path}`
            : 'https://via.placeholder.com/400x250';
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-xl">
                Loading...
            </div>
        );
    }

    if (!course) return <div>Course not found</div>;

    return (
        <div className="max-w-7xl mx-auto p-4 mt-4">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="bg-black rounded-lg overflow-hidden shadow-lg aspect-video relative">
                        {purchased && selectedVideo ? (
                            <video
                                id="courseVideo"
                                ref={videoRef}
                                controls
                                className="w-full h-full object-contain"
                                poster={getAssetUrl(selectedVideo.thumbnailUrl)}
                            />
                        ) : (
                            <div className="w-full h-full relative">
                                <Image
                                    src={getAssetUrl(course.thumbnailUrl)}
                                    alt="Course Thumbnail"
                                    fill
                                    className="object-cover opacity-80"
                                    unoptimized={true}
                                />
                                {!purchased && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white z-10">
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