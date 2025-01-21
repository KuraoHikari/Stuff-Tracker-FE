import {
 SidebarInset,
 SidebarProvider,
 SidebarTrigger,
} from "@/components/ui/sidebar";

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
   {
    path: "item",
    element: <ItemPage />,
   },
   {
    path: "item/create",
    element: <CreateItemPage />,
   },
   {
    path: "item/edit/:id",
    element: <EditItemPage />,
   },
   { path: "category", element: <CategoryPage /> },
   { path: "status", element: <StatusPage /> },
   { path: "condition", element: <ConditionPage /> },
   { path: "location", element: <LocationPage /> },
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
