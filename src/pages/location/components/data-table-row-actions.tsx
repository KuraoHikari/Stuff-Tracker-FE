import { MoreHorizontal } from "lucide-react";

import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuShortcut,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import DeleteLocationDialog from "../DeleteLocationDialog";
import { useState } from "react";
import EditLocationDialog from "../EditLocationDialog";
import { Location } from "../data/schema";

interface DataTableRowActionsProps {
 row: { original: Location };
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
 const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
 const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
 const [editLocation, setEditLocation] = useState<Location | null>(null);

 const handleDeleteClick = () => {
  setIsDeleteDialogOpen(true);
 };

 const handleEditClick = (
  e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>,
  Location: Location
 ) => {
  e.preventDefault();
  setEditLocation(Location);
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
   <EditLocationDialog
    location={editLocation ?? row.original}
    open={isEditDialogOpen}
    onClose={() => setIsEditDialogOpen(false)}
   />
   <DeleteLocationDialog
    location={row.original}
    open={isDeleteDialogOpen}
    onClose={handleCloseDeleteDialog}
   />
  </>
 );
}
