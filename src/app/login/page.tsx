"use client";
import Header from "../components/Header";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Login() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous error message
    const response = await fetch("https://budaya-karya-kita.vercel.app/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      const loginTimestamp = new Date().getTime();
      Cookies.set("isLoggedIn", "true");
      Cookies.set("loginTimestamp", loginTimestamp.toString());
      Cookies.set("userRole", data.role);
      Cookies.set("token", data.accessToken);
      Cookies.set("id", data.id);

      if (data.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }
    } else {
      const errorResponse = await response.json();
      setErrorMessage(errorResponse.error || "Login failed");
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <div className="flex h-screen">
        <div className="w-1/3 bg-red-500">a</div>
        <div className="w-2/3 bg-gray-200 flex flex-col justify-center items-center">
          <div className="w-[540px] h-[96px] text-5xl text-center font-medium">
            Selamat datang ! 👋
          </div>

          <form
            onSubmit={handleLogin}
            className="w-[665px] font-inter flex flex-col items-center"
          >
            {errorMessage && (
              <div className="border border-red-500 bg-red-100 text-red-500 text-sm mt-2 mb-4 p-2 rounded w-full">
                {errorMessage}
              </div>
            )}
            <div className="mb-4 w-full">
              <div className="mb-1 text-gray-500">Email</div>
              <input
                type="text"
                className="w-full rounded-xl p-2 bg-gray-100 border border-gray-300"
                placeholder="Masukkan email kamu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
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
              Masuk
            </button>
          </form>
          <div className="flex flex-row gap-1 text-gray-500">
            Belum buat akun ?
            <Link href={"/register"}>
              <div className="underline text-black">Bergabung</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
