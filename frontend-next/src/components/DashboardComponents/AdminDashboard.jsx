import React, {useState} from 'react';
import {
    LayoutDashboard,
    BookOpen,
    Users,
    DollarSign,
    Video,
    Search,
    Bell,
    Menu,
    MoreVertical
} from 'lucide-react';

const stats = [
    {label: 'Total Revenue', value: '$12,450', icon: DollarSign, color: 'bg-green-500'},
    {label: 'Total Students', value: '2,340', icon: Users, color: 'bg-blue-500'},
    {label: 'Active Courses', value: '12', icon: BookOpen, color: 'bg-purple-500'},
    {label: 'Total Videos', value: '145', icon: Video, color: 'bg-orange-500'},
];

const recentPurchases = [
    {
        id: 1,
        user: 'Alice Johnson',
        course: 'Advanced React Patterns',
        price: 49.99,
        date: '2023-10-24',
        method: 'credit_card'
    },
    {id: 2, user: 'Bob Smith', course: 'Node.js Masterclass', price: 29.99, date: '2023-10-23', method: 'paypal'},
    {id: 3, user: 'Charlie Brown', course: 'MongoDB for Beginners', price: 19.99, date: '2023-10-23', method: 'upi'},
    {
        id: 4,
        user: 'Diana Prince',
        course: 'Full Stack Bootcamp',
        price: 99.99,
        date: '2023-10-22',
        method: 'credit_card'
    },
];

const AdminDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen bg-gray-50">
            {/*<aside*/}
            {/*    className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-slate-900 text-white transition-all duration-300 ease-in-out flex flex-col`}>*/}
            {/*    <div className="p-4 flex items-center justify-between border-b border-slate-800">*/}
            {/*        <span className={`font-bold text-xl ${!sidebarOpen && 'hidden'}`}>AdminPanel</span>*/}
            {/*        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 hover:bg-slate-800 rounded">*/}
            {/*            <Menu size={20}/>*/}
            {/*        </button>*/}
            {/*    </div>*/}

            {/*    <nav className="flex-1 py-6">*/}
            {/*        <ul className="space-y-2 px-2">*/}
            {/*            {[*/}
            {/*                {icon: LayoutDashboard, label: 'Dashboard', active: true},*/}
            {/*                {icon: BookOpen, label: 'Courses'},*/}
            {/*                {icon: Video, label: 'Videos'},*/}
            {/*                {icon: Users, label: 'Students'},*/}
            {/*                {icon: DollarSign, label: 'Revenue'},*/}
            {/*            ].map((item, idx) => (*/}
            {/*                <li key={idx}>*/}
            {/*                    <a href="#"*/}
            {/*                       className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${item.active ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>*/}
            {/*                        <item.icon size={20}/>*/}
            {/*                        <span className={`${!sidebarOpen && 'hidden'}`}>{item.label}</span>*/}
            {/*                    </a>*/}
            {/*                </li>*/}
            {/*            ))}*/}
            {/*        </ul>*/}
            {/*    </nav>*/}

            {/*    <div className="p-4 border-t border-slate-800">*/}
            {/*        <div className="flex items-center gap-3">*/}
            {/*            <div*/}
            {/*                className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-sm font-bold">A*/}
            {/*            </div>*/}
            {/*            <div className={`${!sidebarOpen && 'hidden'}`}>*/}
            {/*                <p className="text-sm font-medium">Admin User</p>*/}
            {/*                <p className="text-xs text-slate-400">admin@example.com</p>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</aside>*/}

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {/* Header */}
                <header className="bg-white shadow-sm sticky top-0 z-10">
                    <div className="flex items-center justify-between px-6 py-4">
                        <h1 className="text-2xl font-bold text-gray-800">Overview</h1>
                        <div className="flex items-center gap-4">
                            <div className="relative hidden md:block">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                        size={18}/>
                                <input type="text" placeholder="Search..."
                                       className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                            </div>
                            <button className="p-2 relative text-gray-600 hover:bg-gray-100 rounded-full">
                                <Bell size={20}/>
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                        </div>
                    </div>
                </header>

                <div className="p-6">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                                        <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                                    </div>
                                    <div
                                        className={`${stat.color} p-3 rounded-lg text-white shadow-lg shadow-opacity-20`}>
                                        <stat.icon size={24}/>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Recent Purchases Table */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-lg font-semibold text-gray-800">Recent Purchases</h2>
                            <button className="text-blue-600 text-sm font-medium hover:underline">View All</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                {recentPurchases.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div
                                                    className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                                                    {item.user.charAt(0)}
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-sm font-medium text-gray-900">{item.user}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.course}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 uppercase">{item.method}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-gray-800">${item.price}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;