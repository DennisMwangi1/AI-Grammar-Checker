import React from 'react';
import { FaRegFileAlt, FaChartLine, FaCog, FaUserCircle } from 'react-icons/fa';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-blue-800 shadow-lg">
            <div className="mx-auto px-6 py-4 flex justify-between items-center">
                {/* Left section (Logo and app name) */}
                <div className="flex items-center space-x-3">
                    <FaRegFileAlt className="text-white text-3xl" />
                    <span className="text-white text-2xl font-bold">AI Doc Analyzer</span>
                </div>

                {/* Right section (Navigation and profile) */}
                <div className="flex items-center space-x-8 hidden sm:flex">
                    {/* Analysis link */}
                    <div className="flex items-center space-x-2 text-white hover:text-yellow-400 cursor-pointer">
                        <FaChartLine className="text-xl" />
                        <span className="hidden lg:block">Analysis</span>
                    </div>
                    {/* Settings link */}
                    <div className="flex items-center space-x-2 text-white hover:text-yellow-400 cursor-pointer">
                        <FaCog className="text-xl" />
                        <span className="hidden lg:block">Settings</span>
                    </div>

                    {/* User Profile */}
                    <div className="flex items-center space-x-2 text-white hover:text-yellow-400 cursor-pointer">
                        <FaUserCircle className="text-2xl" />
                        <span className="hidden lg:block">Profile</span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
