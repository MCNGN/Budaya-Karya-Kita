import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Image src={"/budaya-horizontal.png"} alt="logo" width="200" height="100" />
  );
}

export default function Header() {
  return (
    <header>
      <nav className="flex justify-between place-items-center px-12 h-120 ">
        <div className="flex">
          <Link href="/"> 
          <Logo />
          </Link>
        </div>

        <div className="flex gap-6">
          <Link
            href="/peta"
            className="border-b-2 border-white hover:border-black hover:font-semibold"
          >
            Peta
          </Link>
          <Link
            href=""
            className="border-b-2 border-white  hover:border-black hover:font-semibold"
          >
            Edukasi
          </Link>
          <Link
            href="/forum"
            className="border-b-2 border-white  hover:border-black hover:font-semibold"
          >
            Forum
          </Link>
          <Link
            href=""
            className="border-b-2 border-white hover:border-black hover:font-semibold"
          >
            Acara
          </Link>
        </div>

        <div className="flex gap-5">
          <button>Masuk &gt;</button>
          <button className="border rounded-full px-4 py-2 text-white bg-black">
            Bergabung &gt;
          </button>
        </div>
      </nav>
    </header>
  );
}
