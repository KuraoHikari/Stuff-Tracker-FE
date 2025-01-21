import { MoreHorizontal } from "lucide-react";

import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuShortcut,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import DeletePostDialog from "../DeleteConditionDialog";
import { useState } from "react";
import EditCategoryDialog from "../EditConditionDialog";
import { Condition } from "../data/schema";

interface DataTableRowActionsProps {
 row: { original: Condition };
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
 const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
 const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
 const [editCondition, setEditCondition] = useState<Condition | null>(null);

 const handleDeleteClick = () => {
  setIsDeleteDialogOpen(true);
 };

 const handleEditClick = (
  e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>,
  Condition: Condition
 ) => {
  e.preventDefault();
  setEditCondition(Condition);
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
    condition={editCondition ?? row.original}
    open={isEditDialogOpen}
    onClose={() => setIsEditDialogOpen(false)}
   />
   <DeletePostDialog
    condition={row.original}
    open={isDeleteDialogOpen}
    onClose={handleCloseDeleteDialog}
   />
  </>
 );
}
