"use client";

import Header from "../components/Header";
import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import { PencilIcon, UserIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDropzone } from "react-dropzone";

interface ProfileData {
  username: string;
  profile: string;
  // Add other properties as needed
}

export default function Profiel() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  //   const [isModalOpen, setIsModalOpen] = useState(false);
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("password");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const id = Cookies.get("id");

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

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleUpdateProfile = async (profile: string | null) => {
    // Handle profile update logic, e.g., send data to API
    const response = await fetch(
      `https://budaya-karya-kita-backend.vercel.app/users/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profile,
        }),
      }
    );

    if (response.ok) {
      await fetchProfileData();
      closeModal();
    } else {
      console.error("Failed to update profile");
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setImagePreview(null);
    setImageFile(null);
  };

  const handleImageUpload = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!imageFile) return null;

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("type", "file");

    const response = await fetch("https://api.imgur.com/3/image", {
      method: "POST",
      headers: {
        Authorization: `Bearer 29964a22d818db4e24c2331f760e9542b6bad38e`,
      },
      body: formData,
    });

    const data = await response.json();
    const imageUrl = data.data.link; // Assuming the image URL is in data.data.link

    await handleUpdateProfile(imageUrl);
  };

  const cancelImagePreview = () => {
    setImagePreview(null);
    setImageFile(null);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <div className="flex h-full flex-col justify-center items-center">
        <div className="flex flex-col border w-[500px] h-[400px] rounded-xl shadow-lg justify-center items-center ">
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
                <button
                  className="absolute bottom-0 right-0 p-2 rounded-full bg-black text-white hover:bg-gray-600"
                  onClick={openModal}
                >
                  <PencilIcon className="size-4" />
                </button>
              </div>
              <div className="text-3xl">{profileData.username}</div>
            </div>
          )}
          {/* <form onSubmit={handleUpdateProfile} className="w-full max-w-sm">
            <div className="mb-4">
              <label
                className="block text-black text-sm font-medium mb-2"
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
                className="block text-black text-sm font-medium mb-2"
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
          </form> */}
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <form>
              <div className="flex mb-4 items-center justify-center h-full w-full">
                {!imagePreview && (
                  <div className="flex items-center justify-center w-[480px] h-[320px] bg-gray-500">
                    <div
                      {...getRootProps()}
                      className="px-3 py-2 w-[300] border rounded-lg flex items-center justify-center cursor-pointer"
                    >
                      <input
                        {...getInputProps()}
                        accept="image/png, image/jpeg, image/jpg"
                        className="hidden"
                      />

                      <p className="text-white">
                        Drop file here or select the files
                      </p>
                    </div>
                  </div>
                )}
                {imagePreview && (
                  <div className="relative ">
                    <Image
                      src={imagePreview}
                      alt="Image Preview"
                      width={500}
                      height={500}
                      className="object-contain"
                    />
                    <button
                      type="button"
                      onClick={cancelImagePreview}
                      className="absolute top-1 right-1 bg-white rounded-full"
                    >
                      <XMarkIcon className="size-6" />
                    </button>
                  </div>
                )}
              </div>
              <div className="flex justify-end p-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleImageUpload}
                  className="bg-black text-white px-4 py-2 rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
