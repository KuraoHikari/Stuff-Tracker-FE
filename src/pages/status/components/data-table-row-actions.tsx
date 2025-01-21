import { MoreHorizontal } from "lucide-react";

import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuShortcut,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import DeletePostDialog from "../DeleteStatusDialog";
import { useState } from "react";
import EditCategoryDialog from "../EditStatusDialog";
import { Status } from "../data/schema";

interface DataTableRowActionsProps {
 row: { original: Status };
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
 const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
 const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
 const [editStatus, setEditStatus] = useState<Status | null>(null);

 const handleDeleteClick = () => {
  setIsDeleteDialogOpen(true);
 };

 const handleEditClick = (
  e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>,
  status: Status
 ) => {
  e.preventDefault();
  setEditStatus(status);
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
    status={editStatus ?? row.original}
    open={isEditDialogOpen}
    onClose={() => setIsEditDialogOpen(false)}
   />
   <DeletePostDialog
    status={row.original}
    open={isDeleteDialogOpen}
    onClose={handleCloseDeleteDialog}
   />
  </>
 );
}
