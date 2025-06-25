import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaTimes, FaBars } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../../store/Auth/authSlice";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAvatarDropdownOpen, setIsAvatarDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

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
    dispatch(logoutUser());
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
          <Link to="/" className="text-2xl font-bold tracking-tight">
            <span className={isScrolled ? "text-blue-600" : "text-white"}>
              Blog
            </span>
            <span className="text-yellow-400">Kita</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            {["Home", "About", "Blogs"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`text-sm font-medium capitalize transition-colors ${
                  isScrolled
                    ? "text-gray-700 hover:text-blue-600"
                    : "text-white hover:text-yellow-300"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsAvatarDropdownOpen(!isAvatarDropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center border border-gray-300">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.username}
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
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    isScrolled
                      ? "text-blue-600 hover:bg-blue-50"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium rounded-md bg-yellow-400 text-blue-800 hover:bg-yellow-500"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 md:hidden">
            <button
              onClick={toggleMenu}
              className={`p-2 rounded-md focus:outline-none ${
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className={`md:hidden px-4 pt-2 pb-4 space-y-2 ${
            isScrolled ? "bg-white/95" : "bg-black/90"
          }`}
        >
          {["Home", "About", "Blogs"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="block w-full text-left text-sm font-medium text-white hover:text-yellow-300"
            >
              {item}
            </button>
          ))}
          {!isAuthenticated ? (
            <div className="space-y-2 pt-4">
              <Link
                to="/login"
                className="block text-sm font-medium text-white hover:text-blue-400"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block text-sm font-medium text-yellow-400 hover:text-yellow-500"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="pt-4 space-y-2">
              <Link
                to="/dashboard"
                className="block text-sm font-medium text-white hover:text-blue-400"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left text-sm font-medium text-red-400 hover:text-red-500"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
