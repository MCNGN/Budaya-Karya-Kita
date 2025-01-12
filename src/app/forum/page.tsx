"use client";
import Link from "next/link";
import Header from "../components/Header";
import Post from "../components/Post";
import { useState, useEffect } from "react";
import Image from "next/image";
import Cookies from "js-cookie";

// const dummyData = [
//   {
//     id: 1,
//     username: "@user1",
//     bio: "Bio 1",
//     caption: "Foto bersama ondel-ondel di Jakarta hari Sabtu lalu 👨‍👩‍👧‍👦🔥",
//   },
//   {
//     id: 2,
//     username: "@user2",
//     bio: "Bio 2",
//     caption: "Menikmati kuliner khas Bandung 🍜🍲",
//   },
//   {
//     id: 3,
//     username: "@user3",
//     bio: "Bio 3",
//     caption: "Liburan ke Bali dengan keluarga 🏖️🌴",
//   },
//   {
//     id: 4,
//     username: "@user4",
//     bio: "Bio 4",
//     caption: "Menyaksikan pertunjukan wayang kulit di Yogyakarta 🎭",
//   },
//   {
//     id: 5,
//     username: "@user5",
//     bio: "Bio 5",
//     caption: "Berburu batik di Solo 🧵",
//   },
// ];

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

  useEffect(() => {
    const fetchForumData = async () => {
      try {
        const response = await fetch("http://localhost:4000/forum");
        if (!response.ok) {
          throw new Error("Failed to fetch forum data");
        }
        const data = await response.json();

        // Fetch usernames for each post
        const updatedData = await Promise.all(
          data.map(async (post: PostData) => {
            const userResponse = await fetch(
              `http://localhost:4000/users/${post.user_id}`
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
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleImageUpload = async () => {
    if (!imageFile) return null;

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("type", "file")
    console.log(formData)

    const response = await fetch("https://api.imgur.com/3/image", {
      method: "POST",
      headers: {
        Authorization: `Bearer 29964a22d818db4e24c2331f760e9542b6bad38e`,
      },
      body: formData,
    });

    const data = await response.json();
    console.log(data)
    return data.data.link;
  };

  const handleNewPost = async (e) => {
    e.preventDefault();

    const imageUrl = await handleImageUpload();
    if (!imageUrl) {
      console.error("Image upload failed");
      return;
    }

    // Handle new post submission logic here, including sending the imageUrl to your backend
    console.log("New post created with image URL:", imageUrl);

    closeModal();
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
          className="bg-blue-500 text-white px-4 py-2 rounded-md fixed bottom-4 right-4"
        >
          New Post
        </button>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl mb-4">Create New Post</h2>
            <form onSubmit={handleNewPost}>
              <div className="mb-4">
                <label className="block text-gray-700">Caption</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Image</label>
                <input
                  type="file"
                  className="w-full px-3 py-2 border rounded-lg"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
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
