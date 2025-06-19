import { Link, Outlet } from "react-router-dom";

export default function AuthLayouts() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Authentication</h2>
        <p className="text-center text-gray-600">
          Welcome to the Authentication page.
        </p>
        <div className="mt-6 text-center">
          <Outlet />
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
