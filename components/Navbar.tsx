"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";

const Navbar = () => {
  const router = useRouter();
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", e.target.value);

    const searchQuery = urlParams.toString();

    router.push(`/search?${searchQuery}`);
  };

  return (
    <nav className=" px-5 py-3 md:px-12 bg-white text-black border-b-2 border-gray-500/5">
      <div className=" flex justify-between items-center">
        <Link
          href={"/"}
          className=" hidden md:inline-block text-lg font-medium"
        >
          WATCHES
        </Link>
        <div className=" relative max-w-[300px] md:max-w-[400px] px-2 py-3">
          <div className=" absolute flex items-center inset-0 start-0 ps-4 pointer-events-none">
            <Search className=" w-4 h-4 text-gray-800" />
          </div>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Search..."
            name="search"
            className=" pl-10 relative h-[32px] border-[1px] border-black/10 text-sm rounded-md w-full py-2 px-3 focus:outline-none bg-transparent"
          />
        </div>
        <Link href={"/add-products"} className="">
          <button
            type="button"
            className="px-3 py-2 md:text-sm bg-gray-950 text-white rounded-md text-[10px] cursor-pointer"
          >
            Add Product
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
