"use client";
import Sidebar from "../component/Sidebar";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Comment() {
  interface Comment {
    id: number;
    username: string;
    comment: string;
    post_id: number;
  }

  const [comment, setComment] = useState<Comment[]>([]);

  const fetchComments = async () => {
    const token = Cookies.get("token");
    fetch(
      "https://budaya-karya-kita-php-33e0cba16acb.herokuapp.com/api/comments",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.message || "Failed to fetch educations");
          });
        }
        return response.json();
      })
      .then((data) => {
        setComment(data);
      });
  };
  useEffect(() => {
    fetchComments();
  }, []);

  const handleDeleteClick = async (commentId: number) => {
    const token = Cookies.get("token");
    try {
      const response = await fetch(
        `https://budaya-karya-kita-php-33e0cba16acb.herokuapp.com/api/comment/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setComment((prevComment) =>
          prevComment.filter((comment) => comment.id != commentId)
        );
      } else {
        console.error("Failed to delete forum");
      }
    } catch (error) {
      console.error("Failed to delete forum", error);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex-col w-full p-8">
        <h1 className="text-2xl font-bold mb-4">Comment Management</h1>
        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 rounded-t-lg">
                <th className="py-2 px-4 border-b text-left rounded-tl-lg">
                  Username
                </th>
                <th className="py-2 px-4 border-b text-left">Comment</th>
                <th className="py-2 px-4 border-b text-left rounded-tr-lg">
                  Preview
                </th>
                <th className="py-2 px-4 border-b text-left rounded-tr-lg">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {comment.map((comment) => (
                <tr key={comment.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{comment.username}</td>
                  <td className="py-2 px-4 border-b">{comment.comment}</td>
                  <td className="py-2 px-4 border-b">
                    <a
                      href={`https://budaya-karya-kita.vercel.app/forum/${comment.post_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Link
                    </a>
                  </td>
                  <td className="py-2 px-4 border-b flex-grow-0">
                    <div className="flex">
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() => handleDeleteClick(comment.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
