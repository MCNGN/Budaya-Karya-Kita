"use client";

import Header from "@/app/components/Header";
import Post from "@/app/components/Post";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Cookies from "js-cookie";

export default function ForumDetail() {
  // const dummyData = [
  //   {
  //     id: 1,
  //     username: "@user1",
  //     bio: "Bio 1",
  //     profile: "https://i.imgur.com/NprMOWR.jpeg",
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

  interface PostData {
    id: string;
    username: string;
    user_id: string;
    caption: string;
    profile: string;
    image: string;
  }

  const params = useParams();
  const [forumData, setForumData] = useState<PostData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [comment, setComment] = useState("");

  interface CommentData {
    id: string;
    profile: string;
    comment: string;
  }

  const [comments, setComments] = useState<CommentData[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  useEffect(() => {
    const checkLoginStatus = () => {
      const userCookie = Cookies.get("isLoggedIn");
      if (userCookie) {
        setIsLoggedIn(true);
      }
    };

    checkLoginStatus();
  }, []);

  const handlePostComment = async () => {
    if (comment.length === 0) return;
    const userId = Cookies.get("id");

    try {
      const response = await fetch(
        `https://budaya-karya-kita-backend.vercel.app/comment/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            post_id: params.id,
            comment: comment,
            user_id: userId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to post comment");
      }

      setComment(""); // Clear the input field
      const updatedComments = await fetch(
        `https://budaya-karya-kita-backend.vercel.app/comment/${params.id}/`
      );
      const updatedCommentsJson = await updatedComments.json();
      setComments(updatedCommentsJson);
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const fetchForumData = async () => {
    try {
      const response = await fetch(
        `https://budaya-karya-kita-backend.vercel.app/forum/${params.id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch forum data");
      }

      if (response.ok) {
        const jsonResponse = await response.json();
        setForumData(jsonResponse);
      } else {
        console.error("Failed to fetch:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error fetching forum data:", error);
    }
  };

  useEffect(() => {
    fetchForumData();
  });

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `https://budaya-karya-kita-backend.vercel.app/comment/${params.id}/`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }

        const jsonResponse = await response.json();
        setComments(jsonResponse);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [params.id]);

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Header />
      <div className="flex flex-col justify-center items-center flex-grow px-4 sm:px-0">
        {forumData ? (
          <div className="flex border border-gray-200 w-[1000px] h-[520px] rounded-md overflow-hidden shadow-md">
            <div className="w-1/2 bg-gray-300 relative">
              <Image
                src={forumData.image}
                alt=""
                fill={true}
                objectFit="cover"
              />
            </div>
            <div className="py-2 pl-8 w-1/2 bg-red">
              <Post
                key={forumData.id}
                username={forumData.username}
                profile={forumData.profile}
                caption={forumData.caption}
              />
              <div className="relative">
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="flex flex-row items-start px-4 w-full  mb-4 "
                    >
                      <div className="flex flex-row items-center">
                        <div className="w-[30px] h-[30px] rounded-full inline-flex items-center justify-center bg-gray-500 text-gray-700 flex-shrink-0 mr-2 relative">
                          {comment.profile && (
                            <Image
                              src={comment.profile}
                              alt=""
                              width={45}
                              height={45}
                              className="shadow-xl border-black rounded-full"
                            />
                          )}
                        </div>
                        <div className="break-word text-xs">
                          {comment.comment}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex w-full h-[320px] items-center justify-center">
                    <p>No comments yet.</p>
                  </div>
                )}

                {isLoggedIn && (
                  <div className="absolute top-80 left-0 w-full p-4 bg-white">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                      value={comment}
                      onChange={handleInputChange}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-7 flex items-center "
                      onSubmit={handlePostComment}
                      disabled={comment.length === 0}
                    >
                      <div
                        className={` ${
                          comment.length === 0 ? "text-gray-400" : ""
                        }`}
                      >
                        Post
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-3xl font-medium">Post not found</div>
        )}
      </div>
    </div>
  );
}
