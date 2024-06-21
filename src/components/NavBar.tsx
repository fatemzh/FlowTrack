import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex items-center bg-emerald-100 bg-opacity-60 backdrop-filter backdrop-blur-lg fixed top-0 w-full z-40 h-[70px]">
      <div className="container mx-auto flex justify-between items-center p-2">
        <div
          className="text-3xl font-bold cursor-pointer ml-12"
          onClick={() => navigate("/")}
        >
          FlowTrack
        </div>
        <nav className="flex-1">
          <div className="flex justify-end items-center space-x-4">
            <ul className="hidden md:flex items-center space-x-4 list-none">
              <li className="mx-6">
                <a
                  className="relative text-sm font-medium text-gray-800 cursor-pointer hover:before:w-full hover:before:transform hover:before:translate-x-0 hover:before:opacity-100 before:content-[''] before:w-8 before:h-1 before:bg-green-500 before:rounded before:absolute before:bottom-[-0.6rem] before:opacity-0 before:transition-all before:duration-300 before:ease-in-out before:transform before:translate-x-[-1.5rem]"
                  href="#Hero"
                >
                  Home
                </a>
              </li>
              <li className="mx-6">
                <a
                  className="relative text-sm font-medium text-gray-800 cursor-pointer hover:before:w-full hover:before:transform hover:before:translate-x-0 hover:before:opacity-100 before:content-[''] before:w-8 before:h-1 before:bg-green-500 before:rounded before:absolute before:bottom-[-0.6rem] before:opacity-0 before:transition-all before:duration-300 before:ease-in-out before:transform before:translate-x-[-1.5rem]"
                  href="#Skills"
                >
                  About us
                </a>
              </li>
              <li className="mx-6">
                <a
                  className="relative text-sm font-medium text-gray-800 cursor-pointer hover:before:w-full hover:before:transform hover:before:translate-x-0 hover:before:opacity-100 before:content-[''] before:w-8 before:h-1 before:bg-green-500 before:rounded before:absolute before:bottom-[-0.6rem] before:opacity-0 before:transition-all before:duration-300 before:ease-in-out before:transform before:translate-x-[-1.5rem]"
                  href="#Skills"
                >
                  Workers
                </a>
              </li>
              <li className="mx-6">
                <a
                  className="relative text-sm font-medium text-gray-800 cursor-pointer hover:before:w-full hover:before:transform hover:before:translate-x-0 hover:before:opacity-100 before:content-[''] before:w-8 before:h-1 before:bg-green-500 before:rounded before:absolute before:bottom-[-0.6rem] before:opacity-0 before:transition-all before:duration-300 before:ease-in-out before:transform before:translate-x-[-1.5rem]"
                  href="#Skills"
                >
                  Groups
                </a>
              </li>
              <li className="mx-6">
                <a
                  className="relative text-sm font-medium text-gray-800 cursor-pointer hover:before:w-full hover:before:transform hover:before:translate-x-0 hover:before:opacity-100 before:content-[''] before:w-8 before:h-1 before:bg-green-500 before:rounded before:absolute before:bottom-[-0.6rem] before:opacity-0 before:transition-all before:duration-300 before:ease-in-out before:transform before:translate-x-[-1.5rem]"
                  href="#WorkExperience"
                >
                  Schedules
                </a>
              </li>
              <li className="mx-6">
                <a
                  className="relative text-sm font-medium text-gray-800 cursor-pointer hover:before:w-full hover:before:transform hover:before:translate-x-0 hover:before:opacity-100 before:content-[''] before:w-8 before:h-1 before:bg-green-500 before:rounded before:absolute before:bottom-[-0.6rem] before:opacity-0 before:transition-all before:duration-300 before:ease-in-out before:transform before:translate-x-[-1.5rem]"
                  href="#Contact"
                >
                  Contact
                </a>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded transition duration-300"
                >
                  Log Out
                </button>
              </li>
            </ul>
            <button
              className="md:hidden text-gray-800 focus:outline-none"
              onClick={toggleMenu}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    menuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                ></path>
              </svg>
            </button>
          </div>
        </nav>
        {menuOpen && (
          <nav className="md:hidden bg-green-600 w-full">
            <a href="#features" className="block py-2 px-4 hover:bg-green-700">
              Features
            </a>
            <a href="#about" className="block py-2 px-4 hover:bg-green-700">
              About Us
            </a>
            <a href="/profile" className="block py-2 px-4 hover:bg-green-700">
              Profile
            </a>
            <button
              onClick={handleLogout}
              className="block w-full text-left py-2 px-4 hover:bg-red-700"
            >
              Log Out
            </button>
          </nav>
        )}
      </div>
    </div>
  );
};

export default NavBar;
