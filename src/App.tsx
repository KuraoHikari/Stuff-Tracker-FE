// Importing necessary components and hooks
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

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
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import { authLoader } from "./loaders/authLoader";
import AuthLayout from "./layout/authLayout";
import { dashboardLoader } from "./loaders/dashboardLoader";
import ReactQueryProvider from "./context/ReactQueryProvider";
import { Toaster } from "./components/ui/toaster";
import CategoryPage from "./pages/CategoryPage";
import StatusPage from "./pages/StatusPage";
import ConditionPage from "./pages/ConditionPage";
import LocationPage from "./pages/LocationPage";
import ItemPage from "./pages/ItemPage";
import CreateItemPage from "./pages/item/CreateItemPage";
import EditItemPage from "./pages/item/EditItemPage";

// Creating the router with routes and their respective components
const router = createBrowserRouter([
 {
  path: "/auth", // Route for authentication
  element: <AuthLayout />, // No sidebar in AuthLayout
  loader: authLoader, // Loader for authentication data
 },
 {
  path: "/", // Root path
  element: <MainLayout />, // Sidebar included in MainLayout
  loader: dashboardLoader, // Loader for dashboard data
  children: [
   {
    path: "item", // Route for item page
    element: <ItemPage />, // Component for item page
   },
   {
    path: "item/create", // Route for creating an item
    element: <CreateItemPage />, // Component for creating an item
   },
   {
    path: "item/edit/:id", // Route for editing an item with a specific ID
    element: <EditItemPage />, // Component for editing an item
   },
   {
    path: "category", // Route for category page
    element: <CategoryPage />, // Component for category page
   },
   {
    path: "status", // Route for status page
    element: <StatusPage />, // Component for status page
   },
   {
    path: "condition", // Route for condition page
    element: <ConditionPage />, // Component for condition page
   },
   {
    path: "location", // Route for location page
    element: <LocationPage />, // Component for location page
   },
  ],
 },
]);
// Main layout component with sidebar and header
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

// Main App component with theme and context providers
function App() {
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

// Exporting the App component as default
export default App;
