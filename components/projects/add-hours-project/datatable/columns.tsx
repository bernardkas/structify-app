"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui-reusable/datatable/datatable-column-header"
import { DataTableRowActions } from "@/components/ui-reusable/datatable/datatable-row-action"
import {  ProjectHours } from "@prisma/client"
import { toast } from "react-toastify"
import { useFormattedDate } from "@/lib/use-formatted-date"
import { deleteEmployeeHours } from "@/actions/Model/employee-hours"
import { deleteProjectHours } from "@/actions/Model/project-hours"




export const columns: ColumnDef<ProjectHours>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Project Name" />
    ),
    cell: ({ row }) => {
      // @ts-ignore
      const projectName = row?.original?.project?.name || "No project"; // Safely access the client object
      return <div>{projectName}</div>;
    },
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
    id: "actions",
    accessorKey: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => {
      const deleteProjectHoursById = () => {
        deleteProjectHours(row.original.uuid).then(data => {
          if (data?.success) {
            toast(data?.success, {type: 'success'})
          }
        });

        
      }

      return (
        <DataTableRowActions  row={row} onDelete={deleteProjectHoursById} />
      )
    } 
  },
]