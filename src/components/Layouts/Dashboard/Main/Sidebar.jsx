import {
  FaSignOutAlt,
  FaUser,
  FaTags,
  FaUsersCog,
  FaRegComments,
  FaPenFancy,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../../../store/Auth/authSlice";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const dispatch = useDispatch();
  const profile = {
    user: {
      role: {
        name: "admin", // Ganti ke "user" untuk melihat perbedaan tampilan
      },
    },
  };

  const role = profile?.user?.role?.name;
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-blue-800 text-white z-30 transform transition-transform duration-300 overflow-auto
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:inset-auto`}
      >
        <div className="flex items-center justify-center h-16 px-4 border-b border-blue-700">
          <Link to="/" onClick={() => setSidebarOpen(false)}>
            <h1 className="text-xl font-bold">
              <span className="text-white">Blog</span>
              <span className="text-yellow-300">New</span>
            </h1>
          </Link>
        </div>

        <nav className="mt-6">
          <div className="px-4">
            <p className="text-blue-200 uppercase text-xs font-semibold px-3 py-2">
              Main
            </p>
            <Link
              to="/dashboard"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center px-4 py-3 text-white bg-blue-900 rounded-lg"
            >
              <MdDashboard className="w-5 h-5" />
              <span className="ml-3">Dashboard</span>
            </Link>
          </div>

          <div className="mt-4 px-4">
            <p className="text-blue-200 uppercase text-xs font-semibold px-3 py-2">
              Management
            </p>

            {/* Categories - semua role */}
            <Link
              to="/dashboard/categories"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center px-4 py-3 text-white hover:bg-blue-700 rounded-lg transition-colors"
            >
              <FaTags className="w-5 h-5" />
              <span className="ml-3">Categories</span>
            </Link>

            {/* Admin only */}
            {role === "admin" && (
              <>
                <Link
                  to="/dashboard/roles"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center px-4 py-3 text-white hover:bg-blue-700 rounded-lg transition-colors mt-2"
                >
                  <FaUsersCog className="w-5 h-5" />
                  <span className="ml-3">Roles</span>
                </Link>

                <Link
                  to="/dashboard/posts"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center px-4 py-3 text-white hover:bg-blue-700 rounded-lg transition-colors mt-2"
                >
                  <FaPenFancy className="w-5 h-5" />
                  <span className="ml-3">Posts</span>
                </Link>

                <Link
                  to="/dashboard/comments"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center px-4 py-3 text-white hover:bg-blue-700 rounded-lg transition-colors mt-2"
                >
                  <FaRegComments className="w-5 h-5" />
                  <span className="ml-3">Comments</span>
                </Link>
              </>
            )}
          </div>

          <div className="mt-8 px-4">
            <p className="text-blue-200 uppercase text-xs font-semibold px-3 py-2">
              Settings
            </p>

            <Link
              to="/dashboard/profile"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center px-4 py-3 text-white hover:bg-blue-700 rounded-lg transition-colors mt-2"
            >
              <FaUser className="w-5 h-5" />
              <span className="ml-3">Profile</span>
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-3 text-white hover:bg-blue-700 rounded-lg transition-colors mt-2"
            >
              <FaSignOutAlt className="w-5 h-5" />
              <span className="ml-3">Logout</span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
