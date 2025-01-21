import { MoreHorizontal } from "lucide-react";

import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuShortcut,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import { Item } from "../data/schema";
import { useState } from "react";
import DeleteItemDialog from "../DeleteItemDialog";
import { useNavigate } from "react-router";

interface DataTableRowActionsProps {
 row: { original: Item };
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
 const navigate = useNavigate();
 const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

 const handleDeleteClick = () => {
  setIsDeleteDialogOpen(true);
 };

 const handleCloseDeleteDialog = () => {
  setIsDeleteDialogOpen(false);
 };

 const handleEditClick = () => {
  console.log("Edit clicked");
  navigate(`/item/edit/${row.original.id}`);
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
     <DropdownMenuItem onClick={handleEditClick}>Edit</DropdownMenuItem>

     <DropdownMenuItem onClick={handleDeleteClick}>
      Delete
      <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
     </DropdownMenuItem>
    </DropdownMenuContent>
   </DropdownMenu>
   <DeleteItemDialog
    item={row.original}
    open={isDeleteDialogOpen}
    onClose={handleCloseDeleteDialog}
   />
  </>
 );
}
