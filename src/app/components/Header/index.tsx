"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav className="flex justify-between items-center px-4 sm:px-12 sm:h-120 relative">
        <div className="relative w-[200px] h-[60px] sm:w-[200px] sm:h-[100px]">
          <Link href="/">
            <Image
              src="/budaya-horizontal.png"
              alt="logo"
              fill={true}
              style={{ objectFit: "contain" }}
            />
          </Link>
        </div>

        <div className="hidden sm:flex gap-6">
          <Link
            href="/peta"
            className="border-b-2 border-white hover:border-black hover:font-semibold"
          >
            Peta
          </Link>
          <Link
            href=""
            className="border-b-2 border-white hover:border-black hover:font-semibold"
          >
            Edukasi
          </Link>
          <Link
            href="/forum"
            className="border-b-2 border-white hover:border-black hover:font-semibold"
          >
            Forum
          </Link>
          <Link
            href="/acara"
            className="border-b-2 border-white hover:border-black hover:font-semibold"
          >
            Acara
          </Link>
        </div>

        <div className="hidden sm:flex gap-5">
          <Link href="/login">
            <div>Masuk &gt;</div>
          </Link>
          <Link href="/register">
            <button className="border rounded-full px-4 py-2 text-white bg-black">
              Bergabung &gt;
            </button>
          </Link>
        </div>

        <div className="flex sm:hidden">
          <RxHamburgerMenu onClick={toggleMenu} />
        </div>

        {isMenuOpen && (
          <div
            className={`absolute top-[60px] left-0 w-full bg-white flex flex-col items-center sm:hidden transition-transform duration-700 ease-in-out ${
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
            <Link href="/login" className="py-2" onClick={toggleMenu}>
              Masuk &gt;
            </Link>
            <Link href="/register" className="py-2" onClick={toggleMenu}>
              <button className="border rounded-full px-4 py-2 text-white bg-black">
                Bergabung &gt;
              </button>
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}
