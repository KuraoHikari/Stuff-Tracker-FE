import { Button } from "@/components/ui/button";
import useGetCategories from "@/hooks/useGetCategories";
import { DataTable } from "./category/components/data-table";
import { columns } from "./category/components/columns";
import { Plus } from "lucide-react";
import CreateCategoryDialog from "./category/CreateCategoryDialog";
import { useState } from "react";

const CategoryPage = () => {
 const [showCreateCategoryDialog, setShowCreateCategoryDialog] =
  useState<boolean>(false);
 const { data } = useGetCategories();
 console.log("🚀 ~ TaskPage ~ data:", data);

 const createCategoryDialog = (
  e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
 ) => {
  e.preventDefault();

  setShowCreateCategoryDialog(true);
 };

 return (
  <>
   <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
    <CreateCategoryDialog
     open={showCreateCategoryDialog}
     onClose={() => setShowCreateCategoryDialog(false)}
    />
    <div className="flex items-center justify-between space-y-2">
     <div>
      <h2 className="text-2xl font-bold tracking-tight">Category!</h2>
      <p className="text-muted-foreground">
       Here&apos;s a list of your categories
      </p>
     </div>
     <div className="flex items-center space-x-2">
      <Button
       variant={"outline"}
       onClick={(e) => {
        createCategoryDialog(e);
       }}
      >
       <Plus />
       Add Category
      </Button>
     </div>
    </div>
    <DataTable data={data ?? []} columns={columns} />
   </div>
  </>
 );
};

export default CategoryPage;
