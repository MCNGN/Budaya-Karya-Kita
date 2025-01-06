"use client";
import Header from "../components/Header";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous error message
    const response = await fetch(
      "https://budaya-karya-kita-backend.vercel.app/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.toLowerCase(),
          email,
          password,
        }),
      }
    );

    if (response.ok) {
      // Handle successful registration
      console.log("Registration successful");
      router.push("/login");
    } else {
      const errorResponse = await response.json();
      setErrorMessage(errorResponse.error || "Registration failed");
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <div className="flex h-screen">
        <div className="w-1/3 bg-red-500">a</div>
        <div className="w-2/3 bg-gray-200 flex flex-col justify-center items-center">
          <div className="w-[540px] h-[96px] text-5xl text-center font-inter mb-11">
            Gabung sekarang dalam komunitas berbudaya
          </div>
          <div></div>
          <form
            onSubmit={handleRegister}
            className="w-[665px] font-inter flex flex-col items-center"
          >
            <div className="mb-4 w-full">
              <div className="mb-1 text-gray-500">Username</div>
              <input
                type="text"
                className="w-full rounded-xl p-2 bg-gray-100 border border-gray-300"
                placeholder="Masukkan username kamu"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errorMessage === "Username already exists" && (
                <div className=" text-red-500 text-sm font-semibold mt-2">
                  {errorMessage}
                </div>
              )}
            </div>
            <div className="mb-4 w-full">
              <div className="mb-1 text-gray-500">Email</div>
              <input
                type="email"
                className="w-full rounded-xl p-2 bg-gray-100 border border-gray-300"
                placeholder="Masukkan email kamu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            {errorMessage === "Email already exists" && (
              <div className="text-red-500 text-sm font-semibold mt-2">
                {errorMessage}
              </div>
            )}
            </div>
            <div className="mb-9 w-full">
              <div className="mb-1 text-gray-500">Password</div>
              <div className="relative flex flex-row">
                <input
                  type={passwordVisible ? "text" : "password"}
                  className="flex w-full rounded-xl p-2 bg-gray-100 border border-gray-300"
                  placeholder="Masukkan password kamu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center "
                >
                  {passwordVisible ? (
                    <EyeIcon className="size-6" />
                  ) : (
                    <EyeSlashIcon className="size-6" />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-[200px] rounded-full py-2 px-4 text-white bg-black text-center text-lg mb-5"
            >
              Buat Akun
            </button>
          </form>
          <div className="flex flex-row gap-1 text-gray-500">
            Sudah memiliki akun ?
            <Link href={"/login"}>
              <div className="underline text-black">Masuk</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
