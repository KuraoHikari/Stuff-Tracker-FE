import { ColumnDef } from "@tanstack/react-table";

import { Condition } from "../data/schema";

import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { formatRelativeDate } from "@/lib/utils";

export const columns: ColumnDef<Condition>[] = [
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
  accessorKey: "description",
  header: ({ column }) => (
   <DataTableColumnHeader column={column} title="Description" />
  ),
  cell: ({ row }) => (
   <div className="max-w-[500px] truncate">{row.getValue("description")}</div>
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
