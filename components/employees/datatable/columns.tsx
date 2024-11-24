"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/ui-reusable/datatable/datatable-column-header"
import { DataTableRowActions } from "@/components/ui-reusable/datatable/datatable-row-action"
import { Employee} from "@prisma/client"
import { toast } from "react-toastify"
import { deleteEmployee } from "@/actions/Model/employee"
import { useTranslations } from "next-intl"


const tr = (value: string) => {
  const t = useTranslations('Employee.form');

  return t(value)
}




export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={tr('name')} />
    ),
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={tr('name')} />
    ),
    cell: ({ row }) => <div>{row.getValue("phone")}</div>,
  },
  {
    accessorKey: "color",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={tr('color')} />
    ),
    cell: ({ row }) => {
      const color = row.getValue("color") ;
      return (
        // @ts-ignore
          <div style={{ backgroundColor: color  }}  className={`w-4 h-4 rounded-full`}></div>
      )
    },
  },
  {
    accessorKey: "hourlyRate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={tr('hourlyRate')} />
    ),
    cell: ({ row }) => <div>{row.getValue("hourlyRate")}</div>,
  },
  {
    accessorKey: "salary",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={tr('salary')} />
    ),
    cell: ({ row }) => <div>{row.getValue("salary")}</div>,
  },
  {
    accessorKey: "jobTitle",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={tr('jobTitle')} />
    ),
    cell: ({ row }) => <div>{row.getValue("jobTitle")}</div>,
  },
  {
    id: "actions",
    accessorKey: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => {
      const deleteEmployeeById = () => {
        deleteEmployee(row.original.uuid).then(data => {
          if (data?.success) {
            toast(data?.success, {type: 'success'})
          }
        });
      }

      return (
        <DataTableRowActions  row={row} onDelete={deleteEmployeeById} />
      )
    } 
  },
]