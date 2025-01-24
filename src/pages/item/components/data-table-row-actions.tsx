import { MoreHorizontal } from "lucide-react"; // Importing the MoreHorizontal icon from the Lucide React library

import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuShortcut,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Importing dropdown menu components from a UI library

import { Button } from "@/components/ui/button"; // Importing a reusable Button component from a UI library

import { Item } from "../data/schema"; // Importing the Item type/interface from the schema file
import { useState } from "react"; // Importing the useState hook from React for state management
import DeleteItemDialog from "../DeleteItemDialog"; // Importing the DeleteItemDialog component for item deletion
import { useNavigate } from "react-router"; // Importing the useNavigate hook from React Router for navigation

interface DataTableRowActionsProps {
 row: { original: Item }; // Defining the shape of the props, with `row` containing the `original` object of type `Item`
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
 const navigate = useNavigate(); // Initializing the navigation function from React Router
 const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // State to control the visibility of the delete dialog

 const handleDeleteClick = () => {
  setIsDeleteDialogOpen(true); // Opens the delete dialog when called
 };

 const handleCloseDeleteDialog = () => {
  setIsDeleteDialogOpen(false); // Closes the delete dialog when called
 };

 const handleEditClick = () => {
  console.log("Edit clicked"); // Logs a message when the edit option is clicked
  navigate(`/item/edit/${row.original.id}`); // Navigates to the edit page of the selected item
 };

 return (
  <>
   {/* Dropdown menu for row actions */}
   <DropdownMenu>
    {/* Trigger button for the dropdown menu */}
    <DropdownMenuTrigger asChild>
     <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
      <MoreHorizontal /> {/* Icon representing the menu */}
      <span className="sr-only">Open menu</span> {/* Screen reader-only text */}
     </Button>
    </DropdownMenuTrigger>
    {/* Dropdown menu content */}
    <DropdownMenuContent align="end" className="w-[160px]">
     {/* Edit action in the dropdown */}
     <DropdownMenuItem onClick={handleEditClick}>Edit</DropdownMenuItem>

     {/* Delete action in the dropdown */}
     <DropdownMenuItem onClick={handleDeleteClick}>
      Delete
      <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut> {/* Keyboard shortcut hint */}
     </DropdownMenuItem>
    </DropdownMenuContent>
   </DropdownMenu>
   {/* Delete confirmation dialog */}
   <DeleteItemDialog
    item={row.original} // Pass the item to be deleted
    open={isDeleteDialogOpen} // Control dialog visibility
    onClose={handleCloseDeleteDialog} // Callback to close the dialog
   />
  </>
 );
}
