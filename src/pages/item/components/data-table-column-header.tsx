// Importing the Column type from TanStack React Table for defining column-related functionalities
import { Column } from "@tanstack/react-table";
// Importing icons from the Lucide React library
import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff } from "lucide-react";

// Importing a utility function for class name concatenation
import { cn } from "@/lib/utils";

// Importing dropdown menu components from the UI library
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuSeparator,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Importing the Button component from the UI library
import { Button } from "@/components/ui/button";

// Defining the props for the DataTableColumnHeader component
interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
 column: Column<TData, TValue>; // Column instance for managing column-specific functionalities
 title: string; // Title of the column to display in the header
}

// The DataTableColumnHeader component renders the header of a table column with sorting and visibility options
export function DataTableColumnHeader<TData, TValue>({
 column, // The column instance passed as a prop
 title, // The title of the column passed as a prop
 className, // Additional class names for styling
}: DataTableColumnHeaderProps<TData, TValue>) {
 // If the column cannot be sorted, render a simple header with just the title
 if (!column.getCanSort()) {
  return <div className={cn(className)}>{title}</div>;
 }

 // If the column can be sorted, render a header with sorting and visibility options
 return (
  <div className={cn("flex items-center space-x-2", className)}>
   {/* Dropdown menu for sorting and visibility options */}
   <DropdownMenu>
    {/* Dropdown trigger button */}
    <DropdownMenuTrigger asChild>
     <Button
      variant="ghost" // Using the "ghost" button style
      size="sm" // Small-sized button
      className="-ml-3 h-8 data-[state=open]:bg-accent" // Styling for button with a left margin and background on open state
     >
      <span>{title}</span> {/* Display the column title */}
      {/* Display sorting icon based on the column's current sorting state */}
      {column.getIsSorted() === "desc" ? (
       <ArrowDown /> // Icon for descending sort
      ) : column.getIsSorted() === "asc" ? (
       <ArrowUp /> // Icon for ascending sort
      ) : (
       <ChevronsUpDown /> // Icon for no sort applied
      )}
     </Button>
    </DropdownMenuTrigger>
    {/* Dropdown menu content */}
    <DropdownMenuContent align="start">
     {/* Menu item for sorting in ascending order */}
     <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
      <ArrowUp className="h-3.5 w-3.5 text-muted-foreground/70" /> {/* Ascending icon */}
      Asc
     </DropdownMenuItem>
     {/* Menu item for sorting in descending order */}
     <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
      <ArrowDown className="h-3.5 w-3.5 text-muted-foreground/70" /> {/* Descending icon */}
      Desc
     </DropdownMenuItem>
     {/* Separator between sorting and visibility options */}
     <DropdownMenuSeparator />
     {/* Menu item for hiding the column */}
     <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
      <EyeOff className="h-3.5 w-3.5 text-muted-foreground/70" /> {/* Hide column icon */}
      Hide
     </DropdownMenuItem>
    </DropdownMenuContent>
   </DropdownMenu>
  </div>
 );
}
