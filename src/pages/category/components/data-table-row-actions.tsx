import { MoreHorizontal } from "lucide-react";

import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuShortcut,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Category } from "../data/schema";
import DeleteCatgoryDialog from "../DeleteCategoryDialog";
import { useState } from "react";
import EditCategoryDialog from "../EditCategoryDialog";

interface DataTableRowActionsProps {
 row: { original: Category };
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
 const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
 const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
 const [editCategory, setEditCategory] = useState<Category | null>(null);

 const handleDeleteClick = () => {
  setIsDeleteDialogOpen(true);
 };

 const handleEditClick = (
  e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>,
  category: Category
 ) => {
  e.preventDefault();
  setEditCategory(category);
  setIsEditDialogOpen(true);
 };

 const handleCloseDeleteDialog = () => {
  setIsDeleteDialogOpen(false);
 };
 return (
  <>
   <DropdownMenu>
    <DropdownMenuTrigger asChild>
     <Button
      variant="ghost"
      className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
     >
      <MoreHorizontal />
      <span className="sr-only">Open menu</span>
     </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-[160px]">
     <DropdownMenuItem
      onClick={(e) => {
       handleEditClick(e, row.original);
      }}
     >
      Edit
     </DropdownMenuItem>

     <DropdownMenuItem onClick={handleDeleteClick}>
      Delete
      <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
     </DropdownMenuItem>
    </DropdownMenuContent>
   </DropdownMenu>
   <EditCategoryDialog
    category={editCategory ?? row.original}
    open={isEditDialogOpen}
    onClose={() => setIsEditDialogOpen(false)}
   />
   <DeleteCatgoryDialog
    category={row.original}
    open={isDeleteDialogOpen}
    onClose={handleCloseDeleteDialog}
   />
  </>
 );
}
