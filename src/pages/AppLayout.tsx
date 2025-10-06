import { Outlet } from "react-router-dom";
import AppSidebar from "@/pages/AppSidebar";

export default function AppLayout() {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <main className="flex-1 p-6 sm:ml-64 transition-all duration-300">
        <Outlet />
      </main>
    </div>
  );
}
