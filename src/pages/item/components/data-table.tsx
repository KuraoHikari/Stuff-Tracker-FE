import * as React from "react";
import {
 ColumnDef,
 ColumnFiltersState,
 SortingState,
 VisibilityState,
 flexRender,
 getCoreRowModel,
 getFacetedRowModel,
 getFacetedUniqueValues,
 getFilteredRowModel,
 getPaginationRowModel,
 getSortedRowModel,
 useReactTable,
} from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";

// Interface for DataTable props
interface DataTableProps<TData, TValue> {
 columns: ColumnDef<TData, TValue>[]; // Array of column definitions
 data: TData[]; // Array of data
}

// DataTable component definition
export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
 // State for row selection
 const [rowSelection, setRowSelection] = React.useState({});
 // State for column visibility
 const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
 // State for column filters
 const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
 // State for sorting
 const [sorting, setSorting] = React.useState<SortingState>([{ id: "createdAt", desc: true }]);

 // Creating the table instance using useReactTable hook
 const table = useReactTable({
  data, // Data for the table
  columns, // Column definitions
  state: {
   sorting, // Sorting state
   columnVisibility, // Column visibility state
   rowSelection, // Row selection state
   columnFilters, // Column filters state
  },
  enableRowSelection: true, // Enable row selection
  onRowSelectionChange: setRowSelection, // Handler for row selection change
  onSortingChange: setSorting, // Handler for sorting change
  onColumnFiltersChange: setColumnFilters, // Handler for column filters change
  onColumnVisibilityChange: setColumnVisibility, // Handler for column visibility change
  getCoreRowModel: getCoreRowModel(), // Core row model
  getFilteredRowModel: getFilteredRowModel(), // Filtered row model
  getPaginationRowModel: getPaginationRowModel(), // Pagination row model
  getSortedRowModel: getSortedRowModel(), // Sorted row model
  getFacetedRowModel: getFacetedRowModel(), // Faceted row model
  getFacetedUniqueValues: getFacetedUniqueValues(), // Faceted unique values
 });

 return (
  <div className="space-y-4">
   {/* Toolbar for the DataTable */}
   <DataTableToolbar table={table} />
   <div className="rounded-md border">
    <Table>
     <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
       <TableRow key={headerGroup.id}>
        {headerGroup.headers.map((header) => {
         return (
          <TableHead key={header.id} colSpan={header.colSpan}>
           {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
          </TableHead>
         );
        })}
       </TableRow>
      ))}
     </TableHeader>
     <TableBody>
      {table.getRowModel().rows?.length ? (
       table.getRowModel().rows.map((row) => (
        <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
         {row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
         ))}
        </TableRow>
       ))
      ) : (
       <TableRow>
        <TableCell colSpan={columns.length} className="h-24 text-center">
         No results.
        </TableCell>
       </TableRow>
      )}
     </TableBody>
    </Table>
   </div>
   {/* Pagination for the DataTable */}
   <DataTablePagination table={table} />
  </div>
 );
}
