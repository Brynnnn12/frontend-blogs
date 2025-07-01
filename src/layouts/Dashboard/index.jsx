import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../../components/Layouts/Dashboard/Main/Sidebar";
import Header from "../../components/Layouts/Dashboard/Main/Header";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const currentUser = useSelector((state) => state.auth.user);
  const isAdmin = currentUser?.role === "Admin";

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        currentUser={currentUser}
        isAdmin={isAdmin}
      />

      {/* Main content wrapper */}
      <div className="flex flex-1 flex-col ">
        {/* Header */}
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          currentUser={currentUser}
          isAdmin={isAdmin}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-white h-[calc(100vh-4rem)]">
          <div className="max-w-sm sm:max-w-xl lg:max-w-7xl mx-auto">
            <Outlet context={{ currentUser, isAdmin }} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
