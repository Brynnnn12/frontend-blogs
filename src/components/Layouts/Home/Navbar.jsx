import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaTimes, FaBars } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAvatarDropdownOpen, setIsAvatarDropdownOpen] = useState(false);

  // Dummy data
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [profile, setProfile] = useState({
    name: "John Doe",
    avatar: "", // Empty to use FaUserCircle icon
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    setIsAvatarDropdownOpen(false);
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setProfile({});
    setIsAvatarDropdownOpen(false);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm py-2 text-gray-800"
          : "bg-transparent py-4 text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold tracking-tight">
              <span className={isScrolled ? "text-blue-600" : "text-white"}>
                Shine
              </span>
              <span className="text-yellow-400">Wash</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {["Home", "About", "Blogs"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`px-3 py-2 rounded-md text-sm font-medium capitalize transition-colors ${
                    isScrolled
                      ? "text-gray-700 hover:text-blue-600"
                      : "text-white hover:text-yellow-300"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* User/Auth Section */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {isAuthenticated ? (
                <div className="relative ml-3">
                  <button
                    onClick={() =>
                      setIsAvatarDropdownOpen(!isAvatarDropdownOpen)
                    }
                    className="flex items-center space-x-2 focus:outline-none"
                  >
                    <div className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center border-2 border-white/30">
                      {profile?.avatar ? (
                        <img
                          src={profile.avatar}
                          alt={profile.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FaUserCircle
                          className={`text-3xl ${
                            isScrolled ? "text-blue-600" : "text-white"
                          }`}
                        />
                      )}
                    </div>
                  </button>

                  {isAvatarDropdownOpen && (
                    <div
                      className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 z-50 ${
                        isScrolled ? "bg-white" : "bg-white/95 backdrop-blur-md"
                      } ring-1 ring-black ring-opacity-5`}
                    >
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      isScrolled
                        ? "text-blue-600 hover:bg-blue-50"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className={`px-4 py-2 rounded-md text-sm font-medium bg-yellow-400 hover:bg-yellow-500 text-blue-800 transition-colors`}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none ${
                isScrolled
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {isMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div
          className={`md:hidden transition-all duration-300 ${
            isScrolled ? "bg-white/95" : "bg-black/90 backdrop-blur-md"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {["Home", "About", "Blogs"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left capitalize ${
                  isScrolled
                    ? "text-gray-700 hover:bg-gray-100"
                    : "text-white hover:bg-white/10"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          {!isAuthenticated && (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="px-5 space-y-3">
                <Link
                  to="/login"
                  className={`block w-full px-4 py-2 text-center rounded-md font-medium ${
                    isScrolled
                      ? "text-blue-600 hover:bg-blue-50"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block w-full px-4 py-2 text-center rounded-md font-medium bg-yellow-400 hover:bg-yellow-500 text-blue-800"
                >
                  Register
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
