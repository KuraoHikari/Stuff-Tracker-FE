// Importing the ColumnDef type from TanStack React Table to define table columns
import { ColumnDef } from "@tanstack/react-table";

// Importing the Item interface from the schema to type the table data
import { Item } from "../data/schema";

// Importing the DataTableColumnHeader component for rendering column headers
import { DataTableColumnHeader } from "./data-table-column-header";
// Importing the DataTableRowActions component for row action buttons
import { DataTableRowActions } from "./data-table-row-actions";
// Importing a utility function to format relative dates
import { formatRelativeDate } from "@/lib/utils";

// Defining the columns for the data table with type `Item`
export const columns: ColumnDef<Item>[] = [
 {
  // Column for the "id" field
  accessorKey: "id", // Specifies the key in the data to be accessed
  header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />, // Renders the column header using DataTableColumnHeader
  cell: ({ row }) => (
   <div className="max-w-[100px] truncate font-medium">
    {row.getValue("id")} {/* Displays the "id" value */}
   </div>
  ),
  enableSorting: false, // Disables sorting for this column
  enableHiding: false, // Disables the ability to hide this column
 },
 {
  // Column for the "name" field
  accessorKey: "name",
  header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
  cell: ({ row }) => (
   <div className="max-w-[500px] truncate font-medium">
    {row.getValue("name")} {/* Displays the "name" value */}
   </div>
  ),
 },
 {
  // Column for the "description" field
  accessorKey: "description",
  header: ({ column }) => <DataTableColumnHeader column={column} title="Description" />,
  cell: ({ row }) => (
   <div className="max-w-[500px] truncate">
    {row.getValue("description")} {/* Displays the "description" value */}
   </div>
  ),
 },
 {
  // Column for the "purchasePrice" field
  accessorKey: "purchasePrice",
  header: ({ column }) => <DataTableColumnHeader column={column} title="Purchase Price" />,
  cell: ({ row }) => <div className="">{row.getValue("purchasePrice")}</div>, // Displays the "purchasePrice" value
 },
 {
  // Column for the "sellPrice" field
  accessorKey: "sellPrice",
  header: ({ column }) => <DataTableColumnHeader column={column} title="Sell Price" />,
  cell: ({ row }) => <div className="">{row.getValue("sellPrice")}</div>, // Displays the "sellPrice" value
 },
 {
  // Column for the "estimatedValue" field
  accessorKey: "estimatedValue",
  header: ({ column }) => <DataTableColumnHeader column={column} title="Estimated Value" />,
  cell: ({ row }) => <div className="">{row.getValue("estimatedValue")}</div>, // Displays the "estimatedValue" value
 },
 {
  // Column for the "purchaseDate" field
  accessorKey: "purchaseDate",
  header: ({ column }) => <DataTableColumnHeader column={column} title="Purchase Date" />,
  cell: ({ row }) => (
   <div className="">
    {row.getValue("purchaseDate") // Checks if a purchase date exists
     ? formatRelativeDate(new Date(row.getValue("purchaseDate"))) // Formats the date if present
     : "N/A"}{" "}
   </div>
  ),
 },
 {
  // Column for the "expiredDate" field
  accessorKey: "expiredDate",
  header: ({ column }) => <DataTableColumnHeader column={column} title="Expired Date" />,
  cell: ({ row }) => (
   <div className="">
    {row.getValue("expiredDate") // Checks if an expired date exists
     ? formatRelativeDate(new Date(row.getValue("expiredDate"))) // Formats the date if present
     : "N/A"}{" "}
   </div>
  ),
 },
 {
  // Column for the "category" field
  accessorKey: "category",
  header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
  cell: ({ row }) => <div className="">{row.getValue("category")}</div>, // Displays the "category" value
 },
 {
  // Column for the "condition" field
  accessorKey: "condition",
  header: ({ column }) => <DataTableColumnHeader column={column} title="Condition" />,
  cell: ({ row }) => <div className="">{row.getValue("condition")}</div>, // Displays the "condition" value
 },
 {
  // Column for the "location" field
  accessorKey: "location",
  header: ({ column }) => <DataTableColumnHeader column={column} title="Location" />,
  cell: ({ row }) => <div className="">{row.getValue("location")}</div>, // Displays the "location" value
 },
 {
  // Column for the "status" field
  accessorKey: "status",
  header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
  cell: ({ row }) => <div className="">{row.getValue("status")}</div>, // Displays the "status" value
 },
 {
  // Column for row actions (e.g., edit or delete)
  id: "actions", // Custom column without accessorKey
  cell: ({ row }) => <DataTableRowActions row={row} />, // Renders the row actions component
 },
];
