'use client'
import React, { useEffect, useState } from "react";
import {useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import Image from "next/image";

const Profile = () => {
    const data=useSelector(state => state.user);
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setUser(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching profile", error);
                router.push("/login");
            }
        };
        fetchProfile().then(r => console.log(r));
    }, []);



    const handleLogout = () => {
        router.push("/logout");
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600"></div>

                <div className="px-6 pb-8 relative">
                    <div className="relative -mt-16 mb-6 flex justify-center sm:justify-start">
                        <Image
                            width={100}
                            height={100}
                            src={user.image ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/static/${user.image}` : "https://placehold.co/150"}
                            alt="Profile"

                            className="w-32 h-32 rounded-full border-4 border-white object-cover bg-white shadow-md"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                            <p className="text-gray-600">{user.email}</p>
                        </div>
                        <button
                            onClick={() => navigate("/purchases")}
                            className="mt-4 sm:mt-0 bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition shadow"
                        >
                            My Learning
                        </button>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                        <h2 className="text-xl font-semibold mb-4">Account Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <span className="block text-sm text-gray-500">Phone Number</span>
                                <span className="text-lg font-medium text-gray-800">{user.phone}</span>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <span className="block text-sm text-gray-500">Member Since</span>
                                <span className="text-lg font-medium text-gray-800">
                            {new Date(user.createdAt).toLocaleDateString()}
                        </span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                        <button
                            onClick={handleLogout}
                            className="text-red-600 font-semibold hover:text-red-800 border border-red-200 px-4 py-2 rounded hover:bg-red-50 transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;