import { Rocket, Laptop, Trophy } from "lucide-react";

const AuthAside = () => {
    return (
        <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-600 to-indigo-900 text-white p-12 flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
                <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white blur-3xl"></div>
                <div className="absolute top-1/2 right-0 w-64 h-64 rounded-full bg-blue-400 blur-3xl"></div>
            </div>

            <div className="relative z-10">
                <h2 className="text-4xl font-bold mb-4">XFACTOR</h2>
                <p className="text-lg opacity-90 mb-12 leading-relaxed">
                    Accelerate your career with our expert-led courses. Join a community of achievers today.
                </p>

                <div className="space-y-8">
                    <div className="flex items-center group">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex justify-center items-center mr-4 backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300">
                            <Rocket className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-1">Expert Courses</h3>
                            <p className="text-sm opacity-80">Learn from industry professionals</p>
                        </div>
                    </div>

                    <div className="flex items-center group">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex justify-center items-center mr-4 backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300">
                            <Laptop className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-1">Flexible Learning</h3>
                            <p className="text-sm opacity-80">Study at your own pace, anywhere</p>
                        </div>
                    </div>

                    <div className="flex items-center group">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex justify-center items-center mr-4 backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300">
                            <Trophy className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-1">Career Success</h3>
                            <p className="text-sm opacity-80">92% of students report advancement</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AuthAside;