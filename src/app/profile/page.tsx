"use client";

import Header from "../components/Header";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import { PencilIcon, UserIcon } from "@heroicons/react/24/outline";

interface ProfileData {
  username: string;
  profile: string;
  // Add other properties as needed
}

export default function Profiel() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  //   const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("password");

  const id = Cookies.get("id");
  console.log(id);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          `https://budaya-karya-kita-backend.vercel.app/users/${id}`
        ); // Adjust the API endpoint as needed
        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfileData();
  }, []);

  const handleUpdateProfile = async (event: React.FormEvent) => {
    event.preventDefault();
    // Handle profile update logic, e.g., send data to API
    console.log("Profile updated:", { email, password });
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <div className="flex h-full flex-col justify-center items-center">
        <div className="flex flex-col border w-[500px] h-[500px] rounded-xl shadow-lg justify-center items-center ">
          {profileData && (
            <div className="flex flex-row px-14 w-full items-center mb-4">
              <div className="w-[100px] h-[100px] rounded-full border bg-white relative mr-4 ">
                <div className="flex w-[100px] h-[100px] rounded-full border items-center justify-center relative overflow-hidden">
                  {profileData.profile ? (
                    <Image
                      src={profileData.profile}
                      alt=""
                      fill={true}
                      className="object-scale-down"
                    />
                  ) : (
                    <UserIcon className="size-12" />
                  )}
                </div>
                <button className="absolute bottom-0 right-0 p-2 rounded-full bg-black text-white hover:bg-gray-600">
                  <PencilIcon className="size-4" />
                </button>
              </div>
              <div className="text-3xl">{profileData.username}</div>
            </div>
          )}
          <form onSubmit={handleUpdateProfile} className="w-full max-w-sm">
            <div className="mb-4">
              <label
                className="block text-black text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-black text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPassword("")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
