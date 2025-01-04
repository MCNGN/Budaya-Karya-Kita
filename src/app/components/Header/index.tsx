"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const selectedPage = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  console.log(selectedPage);

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

        <div className="hidden sm:text-lg sm:flex gap-6">
          <Link
            href="/peta"
            className={`border-b-2 ${
              selectedPage === "/peta"
                ? "border-black font-semibold"
                : "border-white hover:border-black hover:font-semibold"
            }`}
          >
            Peta
          </Link>
          <Link
            href="/edukasi"
            className={`border-b-2 ${
              selectedPage === "/edukasi"
                ? "border-black font-semibold"
                : "border-white hover:border-black hover:font-semibold"
            }`}
          >
            Edukasi
          </Link>
          <Link
            href="/forum"
            className={`border-b-2 ${
              selectedPage === "/forum"
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

        <div className="hidden sm:text-lg sm:flex gap-4 items-center">
          <Link href="/login">
            <div>Masuk &gt;</div>
          </Link>
          <div>
            <Link href="/register">
              <button className="rounded-full py-2 px-4 text-white bg-black">
                Bergabung &gt;
              </button>
            </Link>
          </div>
        </div>

        <div className="flex sm:hidden">
          <RxHamburgerMenu onClick={toggleMenu} />
        </div>

        {isMenuOpen && (
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
              href=""
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
            <Link href="/login" className="py-2" onClick={toggleMenu}>
              Masuk
            </Link>
            <Link href="/register" className="py-2" onClick={toggleMenu}>
              Bergabung
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}
