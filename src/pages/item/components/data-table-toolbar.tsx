import { Button } from "@/components/ui/button"; // Importing a reusable Button component from the UI library
import { Input } from "@/components/ui/input"; // Importing a reusable Input component from the UI library
import { Table } from "@tanstack/react-table"; // Importing the Table type from the TanStack React Table library
import { X } from "lucide-react"; // Importing the X icon from the Lucide React library
import { DataTableViewOptions } from "./data-table-view-options"; // Importing the DataTableViewOptions component for additional view options

// Defining the props for the DataTableToolbar component, where `table` is a Table instance of generic type TData
interface DataTableToolbarProps<TData> {
 table: Table<TData>; // Table instance to manage table data and state
}

// The DataTableToolbar component accepts a generic type TData and renders the toolbar for a data table
export function DataTableToolbar<TData>({
 table, // Destructuring the `table` prop
}: DataTableToolbarProps<TData>) {
 // Checking if the table has any active column filters
 const isFiltered = table.getState().columnFilters.length > 0;

 return (
  <div className="flex items-center justify-between">
   {/* Left section of the toolbar for filtering */}
   <div className="flex flex-1 items-center space-x-2">
    <Input
     placeholder="Filter categories..." // Placeholder text for the input
     value={
      (table.getColumn("name")?.getFilterValue() as string) ?? "" // Getting the filter value for the "name" column, defaulting to an empty string
     }
     onChange={
      (event) => table.getColumn("name")?.setFilterValue(event.target.value) // Updating the filter value for the "name" column on input change
     }
     className="h-8 w-[150px] lg:w-[250px]" // Styling for the input with height and responsive width
    />
    {/* If there are active filters, display the Reset button */}
    {isFiltered && (
     <Button
      variant="ghost" // Setting the button style variant to "ghost"
      onClick={() => table.resetColumnFilters()} // Resetting all column filters when the button is clicked
      className="h-8 px-2 lg:px-3" // Styling for the button with height and padding
     >
      Reset
      <X /> {/* Adding the X icon inside the Reset button */}
     </Button>
    )}
   </div>
   {/* Right section of the toolbar for additional view options */}
   <DataTableViewOptions table={table} />
  </div>
 );
}
