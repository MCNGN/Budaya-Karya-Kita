"use client";
import React, { useState } from "react";
import {
  Bars2Icon,
  XMarkIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`flex ${
        isExpanded ? "w-64" : "w-20"
      } h-screen bg-gray-800 text-white transition-width duration-300`}
    >
      <div className="flex flex-col justify-between h-full w-full">
        <div>
          <button onClick={toggleSidebar} className="p-4 focus:outline-none">
            {isExpanded ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars2Icon className="h-6 w-6" />
            )}
          </button>
          <nav className="mt-4">
            <ul>
              <li className="p-4 hover:bg-gray-700">
                <Link href="/admin/">
                  <div className="flex items-center">
                    <HomeIcon className="h-4 w-4 mr-2" />
                    Dashboard
                  </div>
                </Link>
              </li>
              <li className="p-4 hover:bg-gray-700">
                <Link href="/admin/users">
                  <div className="flex items-center">
                    <UserIcon className="size-4 mr-2" />
                    Users
                  </div>
                </Link>
              </li>
              <li className="p-4 hover:bg-gray-700">Budaya</li>
              <li className="p-4 hover:bg-gray-700">Edukasi</li>
              <li className="p-4 hover:bg-gray-700">Forum</li>
              <li className="p-4 hover:bg-gray-700">Comment</li>
              <li className="p-4 hover:bg-gray-700">Acara</li>
              <li className="p-4 hover:bg-gray-700">Settings</li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
