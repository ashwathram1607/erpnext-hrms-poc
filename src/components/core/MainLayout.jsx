import { useState, useEffect } from "react";



import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Sidebar from "./Sidebar";
import { useAttendanceStore } from "../../store/attendanceStore";
import { ROUTES } from "../../constants";

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState(ROUTES.DASHBOARD);
  const resumeTimer = useAttendanceStore((state) => state.resumeTimer);

  useEffect(() => {
    resumeTimer();
  }, [resumeTimer]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <header className="w-full fixed top-0 left-0 z-50 shadow-md bg-white">
        <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      </header>

      <div className="flex pt-[70px] relative">
        {/* Sidebar Overlay */}
        <Sidebar
          isOpen={isSidebarOpen}
          onNavigate={setActivePage}
          activePage={activePage}
        />

        {/* Optional overlay to close sidebar on click */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0  z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div
          className={`transition-all bg-gradient-to-br from-indigo-50 via-white to-blue-100 duration-300 ${isSidebarOpen ? "ml-64 w-[calc(100%-12rem)]" : "ml-0 w-full"
            }`}
        >
          <main className="relative overflow-y-auto origin-top scale-100 md:scale-[0.95] lg:scale-[0.95] xl:scale-[0.95]">

            <Outlet />

          </main>
        </div>
      </div>
    </div>
  );
}
