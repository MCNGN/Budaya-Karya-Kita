"use client";
import React from "react";
import Sidebar from "../component/Sidebar";
import { useState, useEffect } from "react";
import Image from "next/image";
import Cookies from "js-cookie";

export default function AdminDashboard() {
  interface Comment {
    id: number;
    username: string;
    comment: string;
    profile?: string;
  }

  const [comments, setComment] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("token");

        const commentResponse = await fetch(
          "https://budaya-karya-kita-backend.vercel.app/comment",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const commentData = await commentResponse.json();
        setComment(commentData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-row h-screen overflow-hidden">
      <Sidebar />
      <div className="p-6 flex flex-col w-full">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <div className="grid grid-cols-6 grid-rows-6 gap-4 h-full">
          <div className="bg-white row-span-2 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Total User</h2>
            <p className="mt-2">Review and manage posts.</p>
          </div>
          <div className="bg-white row-span-2 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Total Posts</h2>
            <p className="mt-2">Review and manage posts.</p>
          </div>
          <div className="bg-white row-span-2 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Total Education Content</h2>
            <p className="mt-2">Configure application settings.</p>
          </div>
          <div className="bg-white row-span-2 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Total Event</h2>
            <p className="mt-2">Configure application settings.</p>
          </div>

          <div className="bg-white col-span-2 row-span-6 p-4 rounded-lg shadow-md flex flex-col">
            <h2 className="text-xl font-semibold">Latest Post</h2>
            <p className="mt-2">Manage users and their permissions.</p>
          </div>
          <div className="bg-white col-span-2 row-span-4  p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Latest User</h2>
            <p className="mt-2">Manage users and their permissions.</p>
          </div>
          <div className="bg-white col-span-2 row-span-4  p-4 rounded-lg shadow-md flex flex-col">
            <h2 className="text-xl font-semibold mb-2">Latest Comment</h2>
            <div className="h-[500px] overflow-scroll scrollbar-hidden">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="flex flex-row items-start w-full mb-4 "
                  >
                    <div className="flex flex-row items-center">
                      <div className="w-[50px] h-[50px] rounded-full inline-flex items-center justify-center bg-gray-500 text-gray-700 flex-shrink-0 mr-2 relative">
                        {comment.profile && (
                          <Image
                            src={comment.profile}
                            alt=""
                            fill={true}
                            className="border-black rounded-full object-cover"
                          />
                        )}
                      </div>
                      <div className="break-all text-base">
                        <a className="font-medium">{comment.username} </a>
                        {comment.comment}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex w-full h-[450px] items-center justify-center">
                  <p>No comments yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* <div className="grid grid-cols-4 gap-4 flex-grow">
          <div className="bg-white  p-4 rounded-lg shadow-md flex flex-col">
            <h2 className="text-xl font-semibold mb-3">Latest Comment</h2>
            <div className="h-[450px] overflow-scroll scrollbar-hidden">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="flex flex-row items-start w-full mb-4 "
                  >
                    <div className="flex flex-row items-center">
                      <div className="w-[50px] h-[50px] rounded-full inline-flex items-center justify-center bg-gray-500 text-gray-700 flex-shrink-0 mr-2 relative">
                        {comment.profile && (
                          <Image
                            src={comment.profile}
                            alt=""
                            fill={true}
                            className="border-black rounded-full object-cover"
                          />
                        )}
                      </div>
                      <div className="break-all text-base">
                        <a className="font-medium">{comment.username} </a>
                        {comment.comment}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex w-full h-[450px] items-center justify-center">
                  <p>No comments yet.</p>
                </div>
              )}
            </div>
          </div>
          <div className="bg-white  p-4 rounded-lg shadow-md flex flex-col">
            <h2 className="text-xl font-semibold">Latest User</h2>
            <p className="mt-2">Manage users and their permissions.</p>
          </div>
        </div> */}
      </div>
    </div>
  );
}
