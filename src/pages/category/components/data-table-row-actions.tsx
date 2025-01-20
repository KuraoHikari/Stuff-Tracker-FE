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
import DeletePostDialog from "../DeleteCategoryDialog";
import { useState } from "react";

interface DataTableRowActionsProps {
 row: { original: Category };
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
 const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

 const handleDeleteClick = () => {
  setIsDeleteDialogOpen(true);
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
     <DropdownMenuItem>Edit</DropdownMenuItem>
     <DropdownMenuItem>Make a copy</DropdownMenuItem>
     <DropdownMenuItem>Favorite</DropdownMenuItem>

     <DropdownMenuItem onClick={handleDeleteClick}>
      Delete
      <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
     </DropdownMenuItem>
    </DropdownMenuContent>
   </DropdownMenu>
   <DeletePostDialog
    category={row.original}
    open={isDeleteDialogOpen}
    onClose={handleCloseDeleteDialog}
   />
  </>
 );
}
