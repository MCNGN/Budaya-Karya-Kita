"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Cookies from "js-cookie";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const selectedPage = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    Cookies.remove("isLoggedIn");
    Cookies.remove("loginTimestamp");
    Cookies.remove("accessToken");
    setIsLoggedIn(false);
    router.push("/");
  };

  useEffect(() => {
    const loginTimestamp = Cookies.get("loginTimestamp");
    const currentTime = new Date().getTime();
    const sessionDuration = 24 * 60 * 60 * 1000; // 24 hours

    if (
      loginTimestamp &&
      currentTime - parseInt(loginTimestamp) < sessionDuration
    ) {
      setIsLoggedIn(true);
    } else {
      Cookies.remove("isLoggedIn");
      Cookies.remove("loginTimestamp");
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div>
      <nav className="flex justify-between items-center px-4 sm:px-12 sm:h-120 relative font-inter">
        <div className="relative w-[200px] h-[60px] sm:w-[250px] sm:h-[120px]">
          <Link href="/">
            <Image
              src="/budaya-horizontal.png"
              alt="logo"
              fill={true}
              style={{ objectFit: "contain" }}
            />
          </Link>
        </div>

        <div className="flex-1 flex justify-center">
          <div className="hidden sm:text-lg sm:flex gap-6">
            <Link
              href="/peta"
              className={`border-b-2 ${
                selectedPage.startsWith("/peta")
                  ? "border-black font-semibold"
                  : "border-white hover:border-black hover:font-semibold"
              }`}
            >
              Peta
            </Link>
            <Link
              href="/edukasi"
              className={`border-b-2 ${
                selectedPage.startsWith("/edukasi")
                  ? "border-black font-semibold"
                  : "border-white hover:border-black hover:font-semibold"
              }`}
            >
              Edukasi
            </Link>
            <Link
              href="/forum"
              className={`border-b-2 ${
                selectedPage.startsWith("/forum")
                  ? "border-black font-semibold"
                  : "border-white hover:border-black hover:font-semibold"
              }`}
            >
              Forum
            </Link>
            <Link
              href="/acara"
              className={`border-b-2 ${
                selectedPage === "/acara"
                  ? "border-black font-semibold"
                  : "border-white hover:border-black hover:font-semibold"
              }`}
            >
              Acara
            </Link>
          </div>
        </div>

        <div className="hidden sm:text-lg sm:flex gap-4 items-center">
          {isLoggedIn ? (
            <div className="flex w-[220px]">
              <button
                onClick={toggleDropdown}
                className="flex w-full h-full justify-end"
              >
                <UserCircleIcon className="size-9" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-12 mt-9 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <Link href="/login">
                <div className="flex items-center gap-1 hover:text-neutral-800">
                  <div>Masuk </div>
                  <ChevronRightIcon className="size-5" />
                </div>
              </Link>
              <div>
                <Link href="/register">
                  <button className="flex justify-center rounded-3xl py-2 px-3 text-white bg-black items-center gap-1 hover:bg-neutral-800">
                    <div>Bergabung</div>
                    <ChevronRightIcon className="size-5" />
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="flex sm:hidden">
          <RxHamburgerMenu onClick={toggleMenu} />
        </div>

        {/* {isMenuOpen && (
          <div
            className={`absolute top-[60px] left-0 w-full bg-white flex flex-col items-center mb-4 sm:hidden transition-transform duration-700 ease-in-out ${
              isMenuOpen
                ? "transform translate-y-0"
                : "transform -translate-y-full"
            }`}
          >
            <Link
              href="/peta"
              className="border-b-2 border-white hover:border-black hover:font-semibold py-2"
              onClick={toggleMenu}
            >
              Peta
            </Link>
            <Link
              href="/edukasi"
              className="border-b-2 border-white hover:border-black hover:font-semibold py-2"
              onClick={toggleMenu}
            >
              Edukasi
            </Link>
            <Link
              href="/forum"
              className="border-b-2 border-white hover:border-black hover:font-semibold py-2"
              onClick={toggleMenu}
            >
              Forum
            </Link>
            <Link
              href="/acara"
              className="border-b-2 border-white hover:border-black hover:font-semibold py-2"
              onClick={toggleMenu}
            >
              Acara
            </Link>
            <hr className="w-full border-t border-gray-300 my-1" />
            {isLoggedIn ? (
              <Link href="/profile" className="py-2" onClick={toggleMenu}>
                Profile
              </Link>
            ) : (
              <>
                <Link href="/login" className="py-2" onClick={toggleMenu}>
                  Masuk
                </Link>
                <Link href="/register" className="py-2" onClick={toggleMenu}>
                  Bergabung
                </Link>
              </>
            )}
          </div>
        )} */}
      </nav>
    </div>
  );
}
