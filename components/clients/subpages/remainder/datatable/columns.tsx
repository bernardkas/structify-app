"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui-reusable/datatable/datatable-column-header"
import { DataTableRowActions } from "@/components/ui-reusable/datatable/datatable-row-action"
import { Client, Remainder } from "@prisma/client"
import { toast } from "react-toastify"
import { useFormattedDate } from "@/lib/use-formatted-date"
import { deleteRemainder } from "@/actions/Model/remainder/remainder"




export const columns: ColumnDef<Remainder>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  
  {
    accessorKey: "startDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start date" />
    ),
    cell: ({ row }) => {
        const date = row.getValue("startDate")
        
        return (
            // @ts-ignore
            <div>{date ? useFormattedDate(date) : ''}</div>
        )
    },
  },
  {
    accessorKey: "frequency",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Frequency" />
    ),
    cell: ({ row }) => <div>{row.getValue("frequency")}</div>,
  },
  {
    accessorKey: "reminderTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reminder time" />
    ),
    cell: ({ row }) => <div>{row.getValue("reminderTime")}</div>,
  },  
  {
    id: "actions",
    accessorKey: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => {
      const deleteRemainderById = () => {
        deleteRemainder(row.original.uuid).then(data => {
          if (data?.success) {
            toast(data?.success, {type: 'success'})
          }
        });

        
      }

      return (
        <DataTableRowActions  row={row} onDelete={deleteRemainderById} />
      )
    } 
  },
]