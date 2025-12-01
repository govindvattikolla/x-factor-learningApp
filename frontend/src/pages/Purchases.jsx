import React, { useEffect, useState } from "react";
import axiosInstance from "../service/axiosInstance";
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";

const Purchases = () => {
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);
    const role=useSelector((state) => state.user.role);
    const navigate = useNavigate();

    useEffect(() => {
        alert(role);
        if(role !== 'user'){
            navigate('/dashboard');
        }
        fetchPurchases();
    }, []);

    const fetchPurchases = async () => {
        try {
            const res = await axiosInstance.get("/api/user/my-courses");
            setPurchases(res.data.purchases);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching purchases", error);
            setLoading(false);
        }
    };

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
                    <button
                        onClick={() => navigate("/courses")}
                        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                    >
                        Browse Courses
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {purchases.map((purchase) => {
                        // Safely access course data (in case a course was deleted but purchase record remains)
                        const course = purchase.courseID;
                        if (!course) return null;

                        return (
                            <div
                                key={purchase._id}
                                className="bg-white rounded-lg shadow hover:shadow-xl transition duration-300 border border-gray-200 overflow-hidden flex flex-col"
                            >
                                <div className="relative">
                                    <img
                                        src={course.thumbnailUrl ? `${import.meta.env.VITE_BACKEND_URL}/static/${course.thumbnailUrl}` : 'https://via.placeholder.com/400x225'}
                                        alt={course.title}
                                        className="w-full h-40 object-cover"
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
                                        <button
                                            onClick={() => navigate(`/course/${course._id}`)} // Navigate to the SingleCourse page we built earlier
                                            className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
                                        >
                                            Continue Learning
                                        </button>
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