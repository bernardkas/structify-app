"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui-reusable/datatable/datatable-column-header"
import { DataTableRowActions } from "@/components/ui-reusable/datatable/datatable-row-action"
import {  EmployeeHours } from "@prisma/client"
import { toast } from "react-toastify"
import { useFormattedDate } from "@/lib/use-formatted-date"
import { deleteEmployeeHours } from "@/actions/Model/employee-hours"




export const columns: ColumnDef<EmployeeHours>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Employee Name" />
    ),
    cell: ({ row }) => {
      // @ts-ignore
      const employeeName = row?.original?.employee?.name || "No employee"; // Safely access the client object
      return <div>{employeeName}</div>;
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
      const deleteEmployeeHoursById = () => {
        deleteEmployeeHours(row.original.uuid).then(data => {
          if (data?.success) {
            toast(data?.success, {type: 'success'})
          }
        });

        
      }

      return (
        <DataTableRowActions  row={row} onDelete={deleteEmployeeHoursById} />
      )
    } 
  },
]