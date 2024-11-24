"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/ui-reusable/datatable/datatable-column-header"
import { DataTableRowActions } from "@/components/ui-reusable/datatable/datatable-row-action"
import { Employee, EmployeeHours} from "@prisma/client"
import { toast } from "react-toastify"
import { deleteEmployee } from "@/actions/Model/employee"
import { useFormattedDate } from "@/lib/use-formatted-date"

import { useTranslations } from "next-intl"


const tr = (value: string) => {
  const t = useTranslations('EmployeeHours.form');

  return t(value)
}




export const columns: ColumnDef<EmployeeHours>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={tr(date)} />
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
      <DataTableColumnHeader column={column} title={tr('description')} />
    ),
    cell: ({ row }) => <div>{row.getValue("description")}</div>,
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
]