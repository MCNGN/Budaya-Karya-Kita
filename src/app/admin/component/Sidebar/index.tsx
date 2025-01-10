"use client"
import React, { useState } from 'react';
import { Bars2Icon,XMarkIcon } from "@heroicons/react/24/solid";

export default function Sidebar() {
 const [isExpanded, setIsExpanded] = useState(false);
  
    const toggleSidebar = () => {
      setIsExpanded(!isExpanded);
    };
  
    return (
      <div className={`flex ${isExpanded ? 'w-64' : 'w-20'} h-screen bg-gray-800 text-white transition-width duration-300`}>
        <div className="flex flex-col justify-between h-full w-full">
          <div>
            <button onClick={toggleSidebar} className="p-4 focus:outline-none">
              {isExpanded ? <XMarkIcon className="h-6 w-6" /> : <Bars2Icon className="h-6 w-6" />}
            </button>
            <nav className="mt-4">
              <ul>
                <li className="p-4 hover:bg-gray-700">Dashboard</li>
                <li className="p-4 hover:bg-gray-700">Users</li>
                <li className="p-4 hover:bg-gray-700">Budaya</li>
                <li className="p-4 hover:bg-gray-700">Forum</li>
                <li className="p-4 hover:bg-gray-700">Acara</li>
                <li className="p-4 hover:bg-gray-700">Settings</li>
              </ul>
            </nav>
          </div>
          <div className="p-4">
            <button onClick={toggleSidebar} className="focus:outline-none">
              {isExpanded ? 'Collapse' : 'Expand'}
            </button>
          </div>
        </div>
      </div>
    );
};