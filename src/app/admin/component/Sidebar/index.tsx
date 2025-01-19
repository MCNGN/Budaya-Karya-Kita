"use client";
import React, { useState } from "react";
import {
  Bars2Icon,
  ChevronLeftIcon,
  HomeIcon,
  UserIcon,
  SparklesIcon,
  AcademicCapIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  ChatBubbleOvalLeftIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`flex flex-col ${
        isExpanded ? "w-64" : "w-14"
      } h-screen bg-gray-900 text-white transition-all duration-300 relative`}
    >
      {isExpanded && (
        <div className="ml-1 w-[185px] h-[100px] relative ">
          <Link href={"/"}>
            <Image
              src="/budaya-horizontal-white.png"
              alt="logo"
              fill={true}
              className="object-contain"
            />
          </Link>
        </div>
      )}
      <button
        onClick={toggleSidebar}
        className={`absolute top-4 right-1 p-4 focus:outline-none`}
      >
        {isExpanded ? (
          <ChevronLeftIcon className="h-6 w-6" />
        ) : (
          <Bars2Icon className="h-6 w-6" />
        )}
      </button>
      <div className="flex flex-col justify-between h-full w-full ">
        <div>
          <nav className={`flex ${isExpanded ? "mt-0" : "mt-[90px]"}`}>
            <ul className="w-full">
              <li className="p-3 hover:bg-gray-700 flex items-center transition-all duration-300">
                <Link href="/admin/">
                  <div className="flex items-center">
                    <HomeIcon className={`size-6 mr-2`} />
                    <span
                      className={`ml-4 transition-opacity duration-300 ${
                        isExpanded ? "opacity-100" : "opacity-0 hidden"
                      }`}
                    >
                      Dashboard
                    </span>
                  </div>
                </Link>
              </li>
              <li className="p-3 hover:bg-gray-700 flex items-center transition-all duration-300">
                <Link href="/admin/users">
                  <div className="flex items-center">
                    <UserIcon className={`size-6 mr-2`} />
                    {isExpanded && <span className="ml-4">Users</span>}
                  </div>
                </Link>
              </li>
              <li className="p-3 hover:bg-gray-700 flex items-center transition-all duration-300">
                {/* <Link href="/admin/edukasi"> */}
                <div className="flex items-center">
                  <SparklesIcon className={`size-6 mr-2`} />
                  {isExpanded && <span className="ml-4">Budaya</span>}
                </div>
                {/* </Link> */}
              </li>
              <li className="p-3 hover:bg-gray-700 flex items-center transition-all duration-300">
                <Link href="/admin/edukasi">
                  <div className="flex items-center">
                    <AcademicCapIcon className={`size-6 mr-2`} />
                    {isExpanded && <span className="ml-4">Edukasi</span>}
                  </div>
                </Link>
              </li>
              <li className="p-3 hover:bg-gray-700 flex items-center transition-all duration-300">
                <Link href="/admin/forum">
                  <div className="flex items-center">
                    <ChatBubbleLeftRightIcon className={`size-6 mr-2`} />
                    {isExpanded && <span className="ml-4">Forum</span>}
                  </div>
                </Link>
              </li>
              <li className="p-3 hover:bg-gray-700 flex items-center transition-all duration-300">
                <Link href="/admin/comment">
                <div className="flex items-center">
                  <ChatBubbleOvalLeftIcon className={`size-6 mr-2`} />
                  {isExpanded && <span className="ml-4">Comment</span>}
                </div>
                </Link>
              </li>
              <li className="p-3 hover:bg-gray-700 flex items-center transition-all duration-300">
                {/* <Link href="/admin/edukasi"> */}
                <div className="flex items-center">
                  <CalendarIcon className={`size-6 mr-2`} />
                  {isExpanded && <span className="ml-4">Acara</span>}
                </div>
                {/* </Link> */}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
