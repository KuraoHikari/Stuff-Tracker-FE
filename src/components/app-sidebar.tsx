import {
 ChartNoAxesColumn,
 Cross,
 Dices,
 Home,
 LogOut,
 MapPin,
 Package,
 PackagePlus,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";

import {
 Sidebar,
 SidebarContent,
 SidebarGroup,
 SidebarGroupContent,
 SidebarGroupLabel,
 SidebarMenu,
 SidebarMenuButton,
 SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useCallback } from "react";

// Menu items.
const items = [
 {
  title: "Item",
  url: "/item",
  icon: Package,
 },
 {
  title: "Create Item",
  url: "/item/create",
  icon: PackagePlus,
 },
 {
  title: "Category",
  url: "/category",
  icon: Dices,
 },
 {
  title: "Status",
  url: "/status",
  icon: ChartNoAxesColumn,
 },
 {
  title: "Condition",
  url: "/condition",
  icon: Cross,
 },
 {
  title: "Location",
  url: "/location",
  icon: MapPin,
 },
];

export function AppSidebar() {
 const location = useLocation();

 const navigate = useNavigate();
 const toggleLogout = useCallback(() => {
  localStorage.removeItem("token");
  navigate("/auth");
 }, [navigate]);
 return (
  <Sidebar>
   <SidebarContent>
    <SidebarGroup>
     <SidebarGroupLabel>Application</SidebarGroupLabel>
     <SidebarGroupContent>
      <SidebarMenu>
       {items.map((item) => (
        <SidebarMenuItem key={item.title}>
         <SidebarMenuButton asChild>
          <Link
           to={item.url}
           className={`flex items-center gap-4 px-2.5  ${
            location.pathname === item.url
             ? "text-foreground"
             : "hover:text-foreground text-muted-foreground"
           }`}
          >
           <item.icon />
           <span>{item.title}</span>
          </Link>
         </SidebarMenuButton>
        </SidebarMenuItem>
       ))}
       <SidebarMenuItem key={"Logout"} onClick={toggleLogout}>
        <SidebarMenuButton asChild>
         <div className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
          <LogOut />
          <span>LogOut</span>
         </div>
        </SidebarMenuButton>
       </SidebarMenuItem>
      </SidebarMenu>
     </SidebarGroupContent>
    </SidebarGroup>
   </SidebarContent>
  </Sidebar>
 );
}
