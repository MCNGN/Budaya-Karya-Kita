"use client";
import Link from "next/link";
import Header from "../components/Header";
import Post from "../components/Post";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { useDropzone } from "react-dropzone";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function Forum() {
  interface PostData {
    id: string;
    username: string;
    user_id: string;
    caption: string;
    profile: string;
    image: string;
  }

  const [forumData, setForumData] = useState<PostData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [caption, setCaption] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchForumData = async () => {
      try {
        const response = await fetch(
          "https://budaya-karya-kita-backend.vercel.app/forum"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch forum data");
        }
        const data = await response.json();

        // Fetch usernames for each post
        const updatedData = await Promise.all(
          data.map(async (post: PostData) => {
            const userResponse = await fetch(
              `https://budaya-karya-kita-backend.vercel.app/users/${post.user_id}`
            );
            const userData = await userResponse.json();
            return {
              ...post,
              username: userData.username,
              profile: userData.profile,
            };
          })
        );

        setForumData(updatedData);
      } catch (error) {
        console.error("Error fetching forum data:", error);
      }
    };

    fetchForumData();

    // Check if user is logged in
    const isLoggedIn = Cookies.get("isLoggedIn");
    setIsLoggedIn(!!isLoggedIn);
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setImagePreview(null);
    setImageFile(null);
  };

  const handleImageUpload = async () => {
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
    return data.data;
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleNewPost = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = await handleImageUpload();
    if (!data) {
      console.error("Image upload failed");
      return;
    }

    const newPost = {
      caption,
      image: data.link,
      user_id: Cookies.get("id"),
    };

    try {
      const response = await fetch(
        "https://budaya-karya-kita-backend.vercel.app/forum",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPost),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create new post");
      }
    } catch (error) {
      console.error("Error creating new post:", error);
    }

    // Handle new post submission logic here, including sending the imageUrl to your backend

    closeModal();
  };

  const cancelImagePreview = () => {
    setImagePreview(null);
    setImageFile(null);
  };

  return (
    <div className="h-screen flex flex-col overflow-auto">
      <Header />
      <div className="flex flex-col items-center gap-6 px-4 mb-6 sm:px-0">
        {forumData.map((post, index) => (
          <div
            key={index}
            className="w-full max-w-md sm:max-w-2xl rounded-lg border border-gray-200 overflow-hidden bg-white shadow-md"
          >
            <Link
              href={{
                pathname: `/forum/${post.id}`,
              }}
            >
              <div className="bg-gray-300 h-[500px] w-full relative">
                <Image src={post.image} alt="" fill={true} objectFit="cover" />
              </div>
              <div className="p-4">
                <Post
                  username={post.username}
                  profile={post.profile}
                  caption={post.caption}
                />
              </div>
            </Link>
          </div>
        ))}
      </div>

      {isLoggedIn && (
        <button
          onClick={openModal}
          className="bg-black text-white px-3 py-3 rounded-full fixed bottom-4 right-4 transform transition-transform hover:scale-110"
        >
          <div className="flex items-center p-1">
            <PlusIcon className="h-6 w-6" />
            <div className="ml-2">New Post</div>
          </div>
        </button>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <form onSubmit={handleNewPost}>
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
              <div className="mb-4 p-4">
                <label className="block text-gray-700">Caption</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  required
                />
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
