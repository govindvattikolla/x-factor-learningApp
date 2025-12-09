import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Logout = () => {
    const router = useRouter();

    useEffect(() => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userDetails");

        const timer = setTimeout(() => {
            router("/login");
        }, 2000);


        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="flex items-center justify-center h-screen">
            <p className="text-lg font-medium">Logging you out...</p>
        </div>
    );
};

export default Logout;