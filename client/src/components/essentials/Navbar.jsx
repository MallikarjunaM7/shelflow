import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const gotoShop = () => navigate("/Productdetail");

  return (
    <nav className="flex justify-between items-center bg-white px-4 py-3 text-gray-500 font-poppins shadow-md relative z-20">
      {/* Logo */}
      <div className="logo">
        <a href="/home">
          <img
            src="/public/seld.png"
            alt="logo"
            className="max-w-[150px] transition-transform duration-300 ease-out hover:scale-105"
          />
        </a>
      </div>

      {/* Hamburger Icon (Mobile) */}
      <div className="hamburger md:hidden text-2xl cursor-pointer text-[#4C1F7A]" onClick={toggleSidebar}>
        ☰
      </div>

      {/* Navigation Links */}
      <ul
        className={`fixed top-0 right-0 h-full w-[250px] bg-white flex flex-col items-center justify-center gap-6 text-lg font-semibold transition-transform duration-300 shadow-lg md:static md:flex-row md:h-auto md:w-auto md:shadow-none md:gap-7 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:translate-x-0`}
      >
        {/* Close Button (Mobile Only) */}
        <span
          className="absolute top-4 right-4 text-2xl text-purple-600 cursor-pointer md:hidden"
          onClick={closeSidebar}
        >
          ✕
        </span>

        <li className="hover:scale-105 transition">
          <button onClick={gotoShop} className="hover:text-gray-800">
            Shop
          </button>
        </li>
        <li className="hover:scale-105 transition">
          <a href="/Notification" className="hover:text-gray-800">
            Notifications
          </a>
        </li>
        <li className="hover:scale-105 transition">
          <a href="/Contactus" className="hover:text-gray-800">
            Contact
          </a>
        </li>
        <li className="hover:scale-105 transition">
          <a href="/soldproducts" className="hover:text-gray-800">
            Stats
          </a>
        </li>
        <li className="hover:scale-105 transition">
          <a href="#" className="hover:text-gray-800">
            Suppliers
          </a>
        </li>
        <li className="hover:scale-105 transition">
          <a href="/logout" className="hover:text-gray-800">
            Logout
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
