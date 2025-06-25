import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 flex flex-col justify-center items-center p-6">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
