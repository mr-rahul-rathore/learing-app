import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-6 flex-1 overflow-y-auto">
          {/* 👇 Yaha routes render honge */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;