"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/ui-reusable/datatable/datatable-column-header"
import { ProjectHours} from "@prisma/client"
import { useFormattedDate } from "@/lib/use-formatted-date"




export const columns: ColumnDef<ProjectHours>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("date")
        
      return (
          // @ts-ignore
          <div>{date ? useFormattedDate(date) : ''}</div>
      )
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => <div>{row.getValue("description")}</div>,
  },
  {
    accessorKey: "hours",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Hours" />
    ),
    cell: ({ row }) => <div>{row.getValue("hours")}</div>,
  },
  {
    accessorKey: "minutes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Minutes" />
    ),
    cell: ({ row }) => <div>{row.getValue("minutes") || "N/A"}</div>,
  },
]