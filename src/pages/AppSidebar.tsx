import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Home, Settings, User, Calendar, LogOut, Menu } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/api/supabaseClient";

export default function AppSidebar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!user) return null; // 👈 Sidebar only visible when authenticated

  return (
    <>
      {/* Toggle Button (visible on mobile or topbar) */}
      <div className="fixed top-4 left-4 z-50 sm:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle Sidebar"
        >
          <Menu size={20} />
        </Button>
      </div>

      {/* Sidebar itself */}
      <Sidebar
        side="left"
        variant="sidebar"
        className={`fixed z-40 top-0 left-0 h-full transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        }`}
      >
        <SidebarHeader>
          <div className="px-4 py-2 font-bold text-lg">SmartTask</div>
        </SidebarHeader>

        <SidebarContent className="flex-1 overflow-auto">
          <SidebarGroup>
            <SidebarGroupLabel>Main</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/dashboard" className="flex items-center gap-2">
                    <Home size={20} />
                    <span>Dashboard</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/tasks" className="flex items-center gap-2">
                    <Calendar size={20} />
                    <span>Tasks</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/profile" className="flex items-center gap-2">
                    <User size={20} />
                    <span>Profile</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>

          <SidebarSeparator />

          <SidebarGroup>
            <SidebarGroupLabel>Settings</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/settings" className="flex items-center gap-2">
                    <Settings size={20} />
                    <span>Settings</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>

          <SidebarSeparator />

          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="flex w-full justify-start items-center gap-2 text-red-500"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <div className="px-4 py-2 text-sm text-muted-foreground">
            version 1.0
          </div>
        </SidebarFooter>
      </Sidebar>

      {/* Background overlay (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 sm:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
