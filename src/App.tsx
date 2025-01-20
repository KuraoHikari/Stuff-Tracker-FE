import { useState } from "react";
import {
 SidebarInset,
 SidebarProvider,
 SidebarTrigger,
} from "@/components/ui/sidebar";

import { Button } from "./components/ui/button";
import { AppSidebar } from "./components/app-sidebar";
import { ThemeProvider } from "./components/theme-provider";
import { Separator } from "./components/ui/separator";
import {
 Breadcrumb,
 BreadcrumbItem,
 BreadcrumbLink,
 BreadcrumbList,
 BreadcrumbPage,
 BreadcrumbSeparator,
} from "./components/ui/breadcrumb";
import {
 createBrowserRouter,
 RouterProvider,
 Route,
 Outlet,
 Routes,
} from "react-router";
import { authLoader } from "./loaders/authLoader";
import AuthLayout from "./layout/authLayout";
import { dashboardLoader } from "./loaders/dashboardLoader";
import ReactQueryProvider from "./context/ReactQueryProvider";
import { Toaster } from "./components/ui/toaster";
import CategoryPage from "./pages/CategoryPage";

const Home = () => <div>Home Page</div>;

const Calendar = () => <div>Calendar Page</div>;
const Search = () => <div>Search Page</div>;
const Settings = () => <div>Settings Page</div>;

const router = createBrowserRouter([
 {
  path: "/auth",
  element: <AuthLayout />, // No sidebar in AuthLayout
  loader: authLoader,
 },

 {
  path: "/",
  element: <MainLayout />, // Sidebar included in MainLayout
  loader: dashboardLoader,
  children: [
   { path: "home", element: <Home /> },
   { path: "category", element: <CategoryPage /> },
   { path: "calendar", element: <Calendar /> },
   { path: "search", element: <Search /> },
   { path: "settings", element: <Settings /> },
  ],
 },
]);

function MainLayout() {
 return (
  <>
   <AppSidebar />
   <SidebarInset>
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
     <SidebarTrigger className="-ml-1" />
     <Separator orientation="vertical" className="mr-2 h-4" />
     <Breadcrumb>
      <BreadcrumbList>
       <BreadcrumbItem className="hidden md:block">
        <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
       </BreadcrumbItem>
       <BreadcrumbSeparator className="hidden md:block" />
       <BreadcrumbItem>
        <BreadcrumbPage>Data Fetching</BreadcrumbPage>
       </BreadcrumbItem>
      </BreadcrumbList>
     </Breadcrumb>
    </header>
    <div className="flex flex-1 flex-col gap-4 p-4">
     <Outlet />
    </div>
   </SidebarInset>
  </>
 );
}

function App() {
 const [count, setCount] = useState(0);

 return (
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
   <ReactQueryProvider>
    <SidebarProvider>
     <RouterProvider router={router} />
    </SidebarProvider>
    <Toaster />
   </ReactQueryProvider>
  </ThemeProvider>
 );
}

export default App;
