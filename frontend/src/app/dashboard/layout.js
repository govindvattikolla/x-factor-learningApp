'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = setTimeout(() => {
            const token = localStorage.getItem('token');

            if (!token) {
                router.push('/login');
            } else {
                setIsLoading(false);
            }
        }, 0);

        return () => clearTimeout(checkAuth);
    }, [router]);

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            <Sidebar />

            <main className="flex-1 overflow-y-auto p-8">
                <div className="md:hidden h-12"></div>

                {children}
            </main>
        </div>
    );
}