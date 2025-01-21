import { ColumnDef } from "@tanstack/react-table";

import { Item } from "../data/schema";

import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { formatRelativeDate } from "@/lib/utils";

export const columns: ColumnDef<Item>[] = [
 {
  accessorKey: "id",
  header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
  cell: ({ row }) => (
   <div className="max-w-[100px] truncate font-medium">
    {row.getValue("id")}
   </div>
  ),
  enableSorting: false,
  enableHiding: false,
 },
 {
  accessorKey: "name",
  header: ({ column }) => (
   <DataTableColumnHeader column={column} title="Name" />
  ),
  cell: ({ row }) => (
   <div className="max-w-[500px] truncate font-medium">
    {row.getValue("name")}
   </div>
  ),
 },
 {
  accessorKey: "description",
  header: ({ column }) => (
   <DataTableColumnHeader column={column} title="Description" />
  ),
  cell: ({ row }) => (
   <div className="max-w-[500px] truncate">{row.getValue("description")}</div>
  ),
 },
 {
  accessorKey: "purchasePrice",
  header: ({ column }) => (
   <DataTableColumnHeader column={column} title="Purchase Price" />
  ),
  cell: ({ row }) => <div className="">{row.getValue("purchasePrice")}</div>,
 },
 {
  accessorKey: "sellPrice",
  header: ({ column }) => (
   <DataTableColumnHeader column={column} title="Sell Price" />
  ),
  cell: ({ row }) => <div className="">{row.getValue("sellPrice")}</div>,
 },
 {
  accessorKey: "estimatedValue",
  header: ({ column }) => (
   <DataTableColumnHeader column={column} title="Estimated Value" />
  ),
  cell: ({ row }) => <div className="">{row.getValue("estimatedValue")}</div>,
 },
 {
  accessorKey: "purchaseDate",
  header: ({ column }) => (
   <DataTableColumnHeader column={column} title="Purchase Date" />
  ),
  cell: ({ row }) => (
   <div className="">
    {row.getValue("purchaseDate")
     ? formatRelativeDate(new Date(row.getValue("purchaseDate")))
     : "N/A"}
   </div>
  ),
 },
 {
  accessorKey: "expiredDate",
  header: ({ column }) => (
   <DataTableColumnHeader column={column} title="Expired Date" />
  ),
  cell: ({ row }) => (
   <div className="">
    {row.getValue("expiredDate")
     ? formatRelativeDate(new Date(row.getValue("expiredDate")))
     : "N/A"}
   </div>
  ),
 },
 {
  accessorKey: "category",
  header: ({ column }) => (
   <DataTableColumnHeader column={column} title="Category" />
  ),
  cell: ({ row }) => <div className="">{row.getValue("category")}</div>,
 },
 {
  accessorKey: "condition",
  header: ({ column }) => (
   <DataTableColumnHeader column={column} title="Condition" />
  ),
  cell: ({ row }) => <div className="">{row.getValue("condition")}</div>,
 },
 {
  accessorKey: "location",
  header: ({ column }) => (
   <DataTableColumnHeader column={column} title="Location" />
  ),
  cell: ({ row }) => <div className="">{row.getValue("location")}</div>,
 },
 {
  accessorKey: "status",
  header: ({ column }) => (
   <DataTableColumnHeader column={column} title="Status" />
  ),
  cell: ({ row }) => <div className="">{row.getValue("status")}</div>,
 },
 {
  id: "actions",
  cell: ({ row }) => <DataTableRowActions row={row} />,
 },
];
