import React from "react";
import logo from "../../assets/Logo.png";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import swal from "sweetalert";

function SideBarVendor({ navMenu, children }) {
  const router = useRouter();

  const logoutHandler = () =>{
    Cookies.remove("jwt", { path: "" });
    router.push({
      pathname : "/vendor/login"
    })
  }
  return (
    <div className="relative min-h-screen md:flex ">
      {/* mobile menu bar */}
      <div className="bg-gray-800 text-gray-100 flex justify-between md:hidden">
        {/* logo */}
        <a href="#" className="block p-4 text-white font-bold">
          Better Dev
        </a>
        {/* mobile menu button */}
        <button className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-700">
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      {/* sidebar */}
      <div className="sidebar text-blue-100 w-80 space-y-6 py-7 px-5 sticky inset-y-0 left-0 transform -translate-x-full md:sticky md:translate-x-0 transition duration-200 ease-in-out" style={{backgroundColor:"#363740"}}>
        {/* logo */}
        <a href="#" className="text-white flex items-center space-x-2 px-4">
          <svg
            className="w-8 h-8"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
          </svg>
          <span className="text-2xl font-extrabold text center my-8">RENTVENUE</span>
        </a>
        {/* nav */}
        <nav>
          {navMenu.map((menu, index) => (
            <Link href={menu.href}>
              <a
                key={index}
                className="block nav-vendor py-2.5 px-4 my-3 rounded transition duration-200 font-bold hover:text-white"
                onClick={menu.nama === "Logout" && logoutHandler}
              >
              <span>{menu.nama}</span>
              </a>
            </Link>
          ))}
        </nav>
      </div>
      {/* content */}
      <div className="flex-1 p-10 text-2xl font-bold">{children}</div>
    </div>
  );
}

export default SideBarVendor;
