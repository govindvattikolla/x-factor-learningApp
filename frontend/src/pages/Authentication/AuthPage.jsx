import AuthAside from "../../components/Authside.jsx";
import React, { useState } from "react";
import axios from "axios";
import {Mail, Lock, Phone, CheckCircle, AlertCircle,User } from "lucide-react";
import axiosInstance from "../../service/axiosInstance.js";

const AuthPage = () => {
    const navigate = (path) => console.log(`Navigating to: ${path}`);

    const BASE_URL = "http://localhost:8000";

    const [activeTab, setActiveTab] = useState("login");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        login: "",
        role: "user",
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleTabSwitch = (tab) => {
        setActiveTab(tab);
        setError("");
        setFormData((prev) => ({...prev, password: "", confirmPassword: ""}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        await new Promise(r => setTimeout(r, 800));

        if (activeTab === "login") {
            try {
                const response = await axiosInstance.post(`/api/login`, {
                    role: formData.role,
                    login: formData.login,
                    password: formData.password,
                });

                const {token, role: userRole} = response.data;
                localStorage.setItem("token", token);
                localStorage.setItem("role", userRole);

                if (userRole === "admin") navigate("/admin");
                else navigate(`/${userRole}/dashboard`);

            } catch (err) {
                console.error("Login Error:", err);
                setError(err.response?.data?.message || "Invalid login credentials (Mock API)");
            }
        } else {
            if (formData.password !== formData.confirmPassword) {
                setError("Passwords don't match!");
                setLoading(false);
                return;
            }

            try {
                await axiosInstance.post(`/api/signup`, {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    password: formData.password,
                });

                alert("Signup successful! Please login.");
                handleTabSwitch("login");
            } catch (err) {
                console.error("Signup error:", err);
                setError(err.response?.data?.message || "Signup failed (Mock API)");
            }
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex justify-center items-center p-4 md:p-8 bg-gray-50 font-sans text-gray-800">
            <div
                className="flex w-full max-w-6xl min-h-[600px] bg-white rounded-2xl overflow-hidden shadow-2xl flex-col lg:flex-row">
                <AuthAside/>
                <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">

                    <div className="flex mb-8 border-b border-gray-100">
                        <button
                            onClick={() => handleTabSwitch("login")}
                            className={`pb-3 px-6 text-lg font-medium transition-all relative ${
                                activeTab === "login"
                                    ? "text-blue-600"
                                    : "text-gray-400 hover:text-gray-600"
                            }`}
                        >
                            Login
                            {activeTab === "login" && (
                                <span
                                    className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full"></span>
                            )}
                        </button>
                        <button
                            onClick={() => handleTabSwitch("signup")}
                            className={`pb-3 px-6 text-lg font-medium transition-all relative ${
                                activeTab === "signup"
                                    ? "text-blue-600"
                                    : "text-gray-400 hover:text-gray-600"
                            }`}
                        >
                            Sign Up
                            {activeTab === "signup" && (
                                <span
                                    className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full"></span>
                            )}
                        </button>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">
                            {activeTab === "login" ? "Welcome Back" : "Create Account"}
                        </h2>
                        <p className="text-gray-500">
                            {activeTab === "login"
                                ? "Please enter your details to sign in"
                                : "Please fill out the form to get started"}
                        </p>
                    </div>

                    {error && (
                        <div
                            className="mb-6 p-4 rounded-lg bg-red-50 border border-red-100 flex items-center text-red-600 text-sm animate-fade-in">
                            <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0"/>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {activeTab === "login" && (
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Login as</label>
                                <div className="relative">
                                    <select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleInputChange}
                                        className="w-full p-3 pl-4 pr-10 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                    <div
                                        className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                             strokeLinecap="round" strokeLinejoin="round">
                                            <path d="m6 9 6 6 6-6"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Login Input */}
                        {activeTab === "login" && (
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Phone or Email</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                                    <input
                                        type="text"
                                        name="login"
                                        placeholder="Enter phone or email"
                                        value={formData.login}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
                                    />
                                </div>
                            </div>
                        )}

                        {activeTab === "signup" && (
                            <>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <div className="relative">
                                        <User
                                            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Enter your full name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                    <div className="relative">
                                        <Mail
                                            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Enter your email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                    <div className="relative">
                                        <Phone
                                            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                                        <input
                                            type="text"
                                            name="phone"
                                            placeholder="Enter your phone number"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
                                />
                            </div>
                        </div>

                        {activeTab === "signup" && (
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                <div className="relative">
                                    <CheckCircle
                                        className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="••••••••"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
                                    />
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? "Processing..." : (activeTab === "login" ? "Login" : "Create Account")}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-gray-600">
                            {activeTab === "login" ? "Don't have an account? " : "Already have an account? "}
                            <button
                                type="button"
                                onClick={() => handleTabSwitch(activeTab === "login" ? "signup" : "login")}
                                className="text-blue-600 font-semibold hover:text-blue-700 hover:underline focus:outline-none transition-colors"
                            >
                                {activeTab === "login" ? "Sign Up" : "Login"}
                            </button>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AuthPage;