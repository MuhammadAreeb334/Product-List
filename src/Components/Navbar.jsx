import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { HiMiniXMark } from "react-icons/hi2";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [menuOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/" },
    { name: "About", path: "/" },
    { name: "Contact", path: "/" },
  ];
  return (
    <div>
      <div className="px-4 py-2">
        <div className="sticky flex justify-between items-center w-full gap-10 py-2">
          <div className="flex items-center gap-4">
            <div className="lg:hidden">
              <button className="pt-2" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? (
                  <HiMiniXMark size={26} />
                ) : (
                  <HiMiniBars3BottomRight size={26} />
                )}
              </button>
            </div>
            <h2 className="font-dancing text-3xl md:text-2xl">Dribble</h2>
          </div>
          <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-full shadow-sm">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 mr-2"
            />
            <button className="bg-pink-500 text-white rounded-full p-2 hover:bg-pink-600 transition">
              <CiSearch size={18} />
            </button>
          </div>
          <div className="hidden lg:inline w-full">
            <ul className=" flex gap-5 justify-between items-center text-md font-medium">
              {navLinks.map((item, index) => (
                <li key={index}>
                  <NavLink to={item?.path} className="hover:text-gray-500">
                    {item?.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="gap-3 md:gap-6 flex justify-between items-center">
            <button className="hidden md:inline bg-white py-3 px-4 font-medium rounded-3xl hover:text-gray-500 cursor-pointer">
              Signup
            </button>
            <button className="bg-black text-white py-3 px-6 font-medium cursor-pointer rounded-3xl">
              Login
            </button>
          </div>
        </div>
        <div className="flex md:hidden items-center bg-gray-100 rounded-full px-2 py-2 w-full shadow-sm">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 mr-2"
          />
          <button className="bg-pink-500 text-white rounded-full p-2 hover:bg-pink-600 transition">
            <CiSearch size={18} />
          </button>
        </div>
      </div>
      <div className="mobile-menu lg:hidden">
        <div
          className={`lg:hidden fixed top-18 left-0 w-full bg-white transform transition-transform duration-300 ease-in-out
            ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <ul className="flex flex-col gap-5 items-start md:items-center text-lg font-medium py-8 px-6">
            {navLinks.map((item, index) => (
              <li
                key={index}
                className={`transition-all duration-500 ease-out transform ${
                  menuOpen
                    ? "opacity-100 translate-x-0 translate-y-0"
                    : "opacity-0 -translate-x-10 -translate-y-5"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <NavLink to={item?.path} className="hover:text-gray-500">
                  {item?.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
