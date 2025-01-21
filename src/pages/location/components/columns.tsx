import { ColumnDef } from "@tanstack/react-table";

import { Location } from "../data/schema";

import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { formatRelativeDate } from "@/lib/utils";

export const columns: ColumnDef<Location>[] = [
 {
  accessorKey: "id",
  header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
  cell: ({ row }) => <div className="">{row.getValue("id")}</div>,
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
  accessorKey: "address",
  header: ({ column }) => (
   <DataTableColumnHeader column={column} title="Address" />
  ),
  cell: ({ row }) => (
   <div className="max-w-[500px] truncate">{row.getValue("address")}</div>
  ),
 },
 {
  accessorKey: "latitude",
  header: ({ column }) => (
   <DataTableColumnHeader column={column} title="Latitude" />
  ),
  cell: ({ row }) => (
   <div className="max-w-[500px] truncate">{row.getValue("latitude")}</div>
  ),
 },

 {
  accessorKey: "longitude",
  header: ({ column }) => (
   <DataTableColumnHeader column={column} title="Longitude" />
  ),
  cell: ({ row }) => (
   <div className="max-w-[500px] truncate">{row.getValue("longitude")}</div>
  ),
 },

 {
  accessorKey: "createdAt",

  header: ({ column }) => (
   <DataTableColumnHeader column={column} title="Created At" />
  ),
  cell: ({ row }) => (
   <div className="w-[150px]">
    {formatRelativeDate(new Date(row.getValue("createdAt")))}
   </div>
  ),
 },
 {
  accessorKey: "updatedAt",
  header: ({ column }) => (
   <DataTableColumnHeader column={column} title="Updated At" />
  ),
  cell: ({ row }) => (
   <div className="w-[150px]">
    {formatRelativeDate(new Date(row.getValue("updatedAt")))}
   </div>
  ),
 },
 {
  id: "actions",
  cell: ({ row }) => <DataTableRowActions row={row} />,
 },
];
