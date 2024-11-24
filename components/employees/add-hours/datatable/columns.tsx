"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui-reusable/datatable/datatable-column-header"
import { DataTableRowActions } from "@/components/ui-reusable/datatable/datatable-row-action"
import {  EmployeeHours } from "@prisma/client"
import { toast } from "react-toastify"
import { useFormattedDate } from "@/lib/use-formatted-date"
import { deleteEmployeeHours } from "@/actions/Model/employee-hours"
import { useTranslations } from "next-intl"


const tr = (value: string) => {
  const t = useTranslations('EmployeeHours.form');

  return t(value)
}



export const columns: ColumnDef<EmployeeHours>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={tr('employee')} />
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
      <DataTableColumnHeader column={column} title={tr('hours')} />
    ),
    cell: ({ row }) => <div>{row.getValue("hours")}</div>,
  },
  {
    accessorKey: "minutes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={tr('minutes')} />
    ),
    cell: ({ row }) => <div>{row.getValue("minutes") || "N/A"}</div>,
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={tr('date')} />
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