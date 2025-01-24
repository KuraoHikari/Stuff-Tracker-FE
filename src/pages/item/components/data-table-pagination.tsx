// Importing the Button component from the UI library
import { Button } from "@/components/ui/button";

// Importing Select and related components for dropdown functionality
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Importing the Table type from TanStack React Table library
import { Table } from "@tanstack/react-table";

// Importing icon components from the Lucide React library for pagination controls
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

// Defining the props for the DataTablePagination component, where `table` is a Table instance of generic type TData
interface DataTablePaginationProps<TData> {
 table: Table<TData>; // Table instance to manage table data and pagination state
}

// The DataTablePagination component renders pagination controls and row selection information
export function DataTablePagination<TData>({
 table, // Destructuring the `table` prop
}: DataTablePaginationProps<TData>) {
 return (
  <div className="flex items-center justify-between px-2">
   {/* Left section displaying the number of selected rows */}
   <div className="flex-1 text-sm text-muted-foreground">
    {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
   </div>
   {/* Right section for pagination controls */}
   <div className="flex items-center space-x-6 lg:space-x-8">
    {/* Rows per page selector */}
    <div className="flex items-center space-x-2">
     <p className="text-sm font-medium">Rows per page</p>
     <Select
      value={`${table.getState().pagination.pageSize}`} // Current page size
      onValueChange={(value) => {
       table.setPageSize(Number(value)); // Update page size when a new value is selected
      }}
     >
      <SelectTrigger className="h-8 w-[70px]">
       <SelectValue
        placeholder={table.getState().pagination.pageSize} // Placeholder showing the current page size
       />
      </SelectTrigger>
      <SelectContent side="top">
       {/* Options for page sizes */}
       {[10, 20, 30, 40, 50].map((pageSize) => (
        <SelectItem key={pageSize} value={`${pageSize}`}>
         {pageSize}
        </SelectItem>
       ))}
      </SelectContent>
     </Select>
    </div>
    {/* Current page indicator */}
    <div className="flex w-[100px] items-center justify-center text-sm font-medium">
     Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
    </div>
    {/* Pagination buttons */}
    <div className="flex items-center space-x-2">
     {/* Go to first page button */}
     <Button
      variant="outline"
      className="hidden h-8 w-8 p-0 lg:flex"
      onClick={() => table.setPageIndex(0)} // Navigate to the first page
      disabled={!table.getCanPreviousPage()} // Disable if on the first page
     >
      <span className="sr-only">Go to first page</span> {/* Screen reader text */}
      <ChevronsLeft /> {/* First page icon */}
     </Button>
     {/* Go to previous page button */}
     <Button
      variant="outline"
      className="h-8 w-8 p-0"
      onClick={() => table.previousPage()} // Navigate to the previous page
      disabled={!table.getCanPreviousPage()} // Disable if on the first page
     >
      <span className="sr-only">Go to previous page</span> {/* Screen reader text */}
      <ChevronLeft /> {/* Previous page icon */}
     </Button>
     {/* Go to next page button */}
     <Button
      variant="outline"
      className="h-8 w-8 p-0"
      onClick={() => table.nextPage()} // Navigate to the next page
      disabled={!table.getCanNextPage()} // Disable if on the last page
     >
      <span className="sr-only">Go to next page</span> {/* Screen reader text */}
      <ChevronRight /> {/* Next page icon */}
     </Button>
     {/* Go to last page button */}
     <Button
      variant="outline"
      className="hidden h-8 w-8 p-0 lg:flex"
      onClick={() => table.setPageIndex(table.getPageCount() - 1)} // Navigate to the last page
      disabled={!table.getCanNextPage()} // Disable if on the last page
     >
      <span className="sr-only">Go to last page</span> {/* Screen reader text */}
      <ChevronsRight /> {/* Last page icon */}
     </Button>
    </div>
   </div>
  </div>
 );
}
