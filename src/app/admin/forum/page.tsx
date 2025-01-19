"use client";
import Sidebar from "../component/Sidebar";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Forum() {
  interface Forum {
    id: number;
    username: string;
    caption: string;
    image: string;
  }

  const [forums, setForum] = useState<Forum[]>([]);

  const fetchForum = async () => {
    const token = Cookies.get("token");
    fetch("https://budaya-karya-kita-php-33e0cba16acb.herokuapp.com/api/forum", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.message || "Failed to fetch educations");
          });
        }
        return response.json();
      })
      .then((data) => {
        setForum(data);
      });
  };
  useEffect(() => {
    fetchForum();
  }, []);

  const handleDeleteClick = async (forumId: number) => {
    const token = Cookies.get("token");
    try {
      const response = await fetch(
        `hhttp://budaya-karya-kita-php-33e0cba16acb.herokuapp.com/api/forum/${forumId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (response.ok) {
        setForum((prevForums) =>
          prevForums.filter((forum) => forum.id != forumId)
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
        <h1 className="text-2xl font-bold mb-4">Forum Management</h1>
        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 rounded-t-lg">
                <th className="py-2 px-4 border-b text-left rounded-tl-lg">
                  Username
                </th>
                <th className="py-2 px-4 border-b text-left">Caption</th>
                <th className="py-2 px-4 border-b text-left">Image</th>
                <th className="py-2 px-4 border-b text-left rounded-tr-lg">
                  Preview
                </th>
                <th className="py-2 px-4 border-b text-left rounded-tr-lg">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {forums.map((forum) => (
                <tr key={forum.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{forum.username}</td>
                  <td className="py-2 px-4 border-b">{forum.caption}</td>
                  <td className="py-2 px-4 border-b">{forum.image}</td>
                  <td className="py-2 px-4 border-b">
                    <a
                      href={`https://budaya-karya-kita.vercel.app/forum/${forum.id}`}
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
                        onClick={() => handleDeleteClick(forum.id)}
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
