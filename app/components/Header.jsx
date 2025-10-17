"use client"; 

import Link from "next/link";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { useRouter } from "next/navigation";
import { FaShoppingCart } from "react-icons/fa";
import { IoLogOutSharp } from "react-icons/io5";


export default function Header() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <header className="bg-[#1A1F23] text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-6">
        <Link href="/products">
          <span className="text-[#4E6E5D] font-bold text-lg cursor-pointer">
            <FaShoppingCart size={30}/>
          </span>
        </Link>
        <Link href="/products/create">
          <span className="text-[#AD8A64] font-semibold cursor-pointer">Add New Product</span>
        </Link>
      </div>
      <button
        onClick={handleLogout}
        className=" px-4 py-2 rounded hover:opacity-90 transition"
      >
        <IoLogOutSharp size={30} className="text-[#A44A3F]"/>
      </button>
    </header>
  );
}
