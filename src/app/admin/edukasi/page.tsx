"use client";
import Sidebar from "../component/Sidebar";
import { PlusIcon } from "@heroicons/react/24/solid";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

interface Education {
  id: number;
  title: string;
  description: string;
  image: string;
  youtube: string;
}

export default function Edukasi() {
  const [educations, setEducation] = useState<Education[]>([]);
  const [editEducation, setEditEducation] = useState<Education>({
    id: 0,
    title: "",
    description: "",
    image: "",
    youtube: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const fetchEducations = async () => {
    const token = Cookies.get("token");
    fetch(
      "https://budaya-karya-kita-php-33e0cba16acb.herokuapp.com/api/educations",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
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
        setEducation(data);
      });
  };

  useEffect(() => {
    fetchEducations();
  }, []);

  const openModalForNew = () => {
    setEditEducation({
      id: 0,
      title: "",
      description: "",
      image: "",
      youtube: "",
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditClick = (education: Education) => {
    setEditEducation({
      id: education.id,
      title: education.title,
      description: education.description,
      image: education.image,
      youtube: education.youtube,
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleSaveEducation = async (education: Education) => {
    const token = Cookies.get("token");
    const url = isEditing
      ? `https://budaya-karya-kita-php-33e0cba16acb.herokuapp.com/api/educations/${education.id}`
      : "https://budaya-karya-kita-php-33e0cba16acb.herokuapp.com/api/educations";
    const method = isEditing ? "PUT" : "POST";
    const educationData = isEditing
      ? education
      : {
          title: education.title,
          description: education.description,
          image: education.image,
          youtube: education.youtube,
        };

    try {
      const response = await fetch(url, {
        method,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(educationData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save education");
      }

      const savedEducation = await response.json();
      const updatedEducations = isEditing
        ? educations.map((edu) =>
            edu.id === savedEducation.id ? savedEducation : edu
          )
        : [...educations, savedEducation];
      setEducation(updatedEducations);
      setIsModalOpen(false);
      fetchEducations();
    } catch (error) {
      console.error("Error saving education:", error);
    }
  };

  const handleDeleteEducation = async (id: number) => {
    const token = Cookies.get("token");
    try {
      const response = await fetch(
        `https://budaya-karya-kita-php-33e0cba16acb.herokuapp.com/api/educations/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete education");
      }

      const updatedEducations = educations.filter(
        (education) => education.id !== id
      );
      setEducation(updatedEducations);
    } catch (error) {
      console.error("Error deleting education:", error);
    }
  };

  const handleEditPost = (e: React.FormEvent) => {
    e.preventDefault();
    handleSaveEducation(editEducation);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Edukasi Management</h1>
        <div className="flex justify-end mb-4">
          <div
            className="flex items-center hover:text-gray-500 hover:cursor-pointer"
            onClick={openModalForNew}
          >
            <PlusIcon className="h-4 w-4 mr-1" />
            <p>New Edukasi</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 rounded-t-lg">
                <th className="py-2 px-4 border-b text-left rounded-tl-lg">
                  Title
                </th>
                <th className="py-2 px-4 border-b text-left">Description</th>
                <th className="py-2 px-4 border-b text-left">Image</th>
                <th className="py-2 px-4 border-b text-left rounded-tr-lg">
                  Youtube
                </th>
                <th className="py-2 px-4 border-b text-left rounded-tr-lg">
                  Preview
                </th>
                <th className="py-2 px-4 border-b text-left rounded-tr-lg">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {educations.map((education) => (
                <tr key={education.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{education.title}</td>
                  <td className="py-2 px-4 border-b">
                    {education.description}
                  </td>
                  <td className="py-2 px-4 border-b">{education.image}</td>
                  <td className="py-2 px-4 border-b">{education.youtube}</td>
                  <td className="py-2 px-4 border-b">
                    <a
                      href={`https://budaya-karya-kita.vercel.app/edukasi/${education.id}`}
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
                        className="text-blue-500 hover:underline mr-2"
                        onClick={() => handleEditClick(education)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() => handleDeleteEducation(education.id)}
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

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <form onSubmit={handleEditPost}>
              <div className="flex mb-4 items-center justify-center h-full w-[600px]"></div>
              <EdukasiForm
                editEducation={editEducation}
                setEditEducation={setEditEducation}
              />
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

const EdukasiForm = ({ editEducation, setEditEducation }) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Education
  ) => {
    setEditEducation({
      ...editEducation,
      [field]: e.target.value,
    });
  };

  return (
    <>
      {["title", "description", "image", "youtube"].map((field) => (
        <div key={field} className="mb-4 px-4 py-1">
          <label className="block text-gray-700 capitalize mb-1">{field}</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg"
            value={editEducation[field]}
            onChange={(e) => handleChange(e, field as keyof Education)}
            placeholder={`Enter ${field}`}
          />
        </div>
      ))}
    </>
  );
};
