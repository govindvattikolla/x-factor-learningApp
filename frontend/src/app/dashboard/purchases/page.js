'use client';

import { useEffect, useState } from "react";
import axiosInstance from "@/service/axiosInstance";
import { useRouter } from 'next/navigation';
import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";

const Purchases = () => {
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);

    const role = useSelector((state) => state.user?.role);
    const router = useRouter();

    const fetchPurchases = async () => {
        try {
            const res = await axiosInstance.get("/api/user/my-courses",{
                withCredentials:true
            });
            setPurchases(res.data.purchases);
        } catch (error) {
            console.error("Error fetching purchases", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (role && role !== 'user') {
            router.push('/dashboard');
        }

        fetchPurchases();
    }, [role, router]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading My Courses...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8">My Learning</h1>

            {purchases.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <h2 className="text-2xl font-semibold text-gray-600">No courses purchased yet</h2>
                    <p className="text-gray-500 mt-2">Explore our catalog to start learning.</p>

                    <Link
                        href="/courses"
                        className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                    >
                        Browse Courses
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {purchases.map((purchase) => {
                        const course = purchase.courseID;
                        if (!course) return null;

                        // Helper to safely get image source
                        const imgSrc = course.thumbnailUrl
                            ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/static/${course.thumbnailUrl}`
                            : 'https://via.placeholder.com/400x225';

                        return (
                            <div
                                key={purchase._id}
                                className="bg-white rounded-lg shadow hover:shadow-xl transition duration-300 border border-gray-200 overflow-hidden flex flex-col"
                            >
                                <div className="relative w-full h-40">
                                    {/* 3. FIX: Add 'unoptimized' if using external URL not in config */}
                                    <Image
                                        src={imgSrc}
                                        alt={course.title}
                                        fill // Use fill instead of width/height for responsive cards
                                        className="object-cover"
                                        unoptimized={imgSrc.startsWith('http')}
                                    />
                                </div>

                                <div className="p-4 flex-1 flex flex-col">
                                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-2">
                                        {course.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-4">
                                        Purchased on: {new Date(purchase.paymentOn).toLocaleDateString()}
                                    </p>

                                    <div className="mt-auto">
                                        <Link
                                            href={`/dashboard/course/${course._id}`}
                                            className="block w-full text-center bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
                                        >
                                            Continue Learning
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Purchases;