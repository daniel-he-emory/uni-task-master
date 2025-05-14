
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

import {
  LayoutDashboard,
  ClipboardList,
  Calendar,
  ClipboardCheck,
  User,
  Settings
} from "lucide-react";

const AppSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      title: "Task Board",
      path: "/tasks",
      icon: <ClipboardList className="w-5 h-5" />,
    },
    {
      title: "Meeting Schedule",
      path: "/schedule",
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      title: "Reports & Reviews",
      path: "/reports",
      icon: <ClipboardCheck className="w-5 h-5" />,
    },
    {
      title: "Account",
      path: "/account",
      icon: <User className="w-5 h-5" />,
    },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => navigate(item.path)}
                    className={location.pathname === item.path ? "bg-sidebar-accent" : ""}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-3 py-2">
          <p className="text-xs text-muted-foreground">CS 370 Team Project</p>
          <p className="text-xs text-muted-foreground">Team One - Spring 2025</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
