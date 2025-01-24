// Importing necessary components and hooks
import { Table } from "@tanstack/react-table";
import {
 DropdownMenu,
 DropdownMenuTrigger,
 DropdownMenuContent,
 DropdownMenuLabel,
 DropdownMenuSeparator,
 DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Settings2 } from "lucide-react";

// Interface for DataTableViewOptions props
interface DataTableViewOptionsProps<TData> {
 table: Table<TData>; // Table instance
}

// DataTableViewOptions component definition
export function DataTableViewOptions<TData>({ table }: DataTableViewOptionsProps<TData>) {
 return (
  <DropdownMenu>
   {/* Trigger button for the dropdown menu */}
   <DropdownMenuTrigger asChild>
    <Button variant="outline" size="sm" className="ml-auto hidden h-8 lg:flex">
     <Settings2 />
     View
    </Button>
   </DropdownMenuTrigger>
   {/* Content of the dropdown menu */}
   <DropdownMenuContent align="end" className="w-[150px]">
    <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
    <DropdownMenuSeparator />
    {/* Mapping through all columns to create checkbox items for toggling visibility */}
    {table
     .getAllColumns()
     .filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())
     .map((column) => {
      return (
       <DropdownMenuCheckboxItem
        key={column.id}
        className="capitalize"
        checked={column.getIsVisible()}
        onCheckedChange={(value) => column.toggleVisibility(!!value)}
       >
        {column.id}
       </DropdownMenuCheckboxItem>
      );
     })}
   </DropdownMenuContent>
  </DropdownMenu>
 );
}
