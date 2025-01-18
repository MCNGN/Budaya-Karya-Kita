"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import Cookies from "js-cookie";

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      const token = Cookies.get("token");
      fetch("https://budaya-karya-kita-backend.vercel.app/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((error) => {
              throw new Error(error.message || "Failed to fetch users");
            });
          }
          return response.json();
        })
        .then((data) => {
          setUsers(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    };

    fetchUsers();
  }, []);

  const handleEditClick = (userId: string, currentRole: string) => {
    setEditingUserId(userId);
    setSelectedRole(currentRole);
  };

  const handleRoleChange = (newRole: string) => {
    setSelectedRole(newRole);
  };

  const handleSaveClick = async (userId: string) => {
    const token = Cookies.get("token");
    console.log(token);
    try {
      const response = await fetch(
        `https://budaya-karya-kita-backend.vercel.app/users/${userId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ role: selectedRole }),
        }
      );

      if (response.ok) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id == userId ? { ...user, role: selectedRole } : user
          )
        );
        setEditingUserId(null);
      } else {
        console.error("Failed to update role");
      }
    } catch (error) {
      console.error("Failed to update role", error);
    }
  };

  const handleCancelClick = () => {
    setEditingUserId(null);
    setSelectedRole("");
  };

  const handleDelete = async (userId: string) => {
    const token = Cookies.get("token");
    try {
      const response = await fetch(
        `https://budaya-karya-kita-backend.vercel.app/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id != userId));
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">User Management</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-100 rounded-t-lg">
                  <th className="py-2 px-4 border-b text-left rounded-tl-lg">
                    Username
                  </th>
                  <th className="py-2 px-4 border-b text-left">Email</th>
                  <th className="py-2 px-4 border-b text-left">Role</th>
                  <th className="py-2 px-4 border-b text-left rounded-tr-lg">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{user.username}</td>
                    <td className="py-2 px-4 border-b">{user.email}</td>
                    <td className="py-2 px-4 border-b">
                      {editingUserId == user.id ? (
                        <select
                          value={selectedRole}
                          onChange={(e) => handleRoleChange(e.target.value)}
                          className="border rounded px-2 py-1"
                        >
                          <option value="admin">Admin</option>
                          <option value="user">User</option>
                        </select>
                      ) : (
                        <div className="border-0 rounded px-2 py-1">
                          {user.role}
                        </div>
                      )}
                    </td>
                    <td className="py-2 px-4 border-b flex-grow-0">
                      {editingUserId == user.id ? (
                        <>
                          <button
                            className="text-green-500 hover:underline mr-2"
                            onClick={() => handleSaveClick(user.id)}
                          >
                            Save
                          </button>
                          <button
                            className="text-red-500 hover:underline mr-2"
                            onClick={handleCancelClick}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          className="text-blue-500 hover:underline mr-2"
                          onClick={() => handleEditClick(user.id, user.role)}
                        >
                          Edit
                        </button>
                      )}
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
