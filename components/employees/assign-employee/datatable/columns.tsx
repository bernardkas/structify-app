"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/ui-reusable/datatable/datatable-column-header"
import { DataTableRowActions } from "@/components/ui-reusable/datatable/datatable-row-action"
import {  AssignEmployee } from "@prisma/client"
import { toast } from "react-toastify"
import { deleteAssignEmployee } from "@/actions/Model/assign-employee"
import { useTranslations } from "next-intl"


const tr = (value: string) => {
  const t = useTranslations('AssignEmployee.form');

  return t(value)
}



export const columns: ColumnDef<AssignEmployee>[] = [
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
    accessorKey: "project.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={tr('project')} />
    ),
    cell: ({ row }) => {
      // @ts-ignore
      const projectName = row?.original?.project?.name || "No project"; // Safely access the client object
      return <div>{projectName}</div>;
    },
  },
  {
    id: "actions",
    accessorKey: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => {
      const deleteAssignEmployeeById = () => {
        deleteAssignEmployee(row.original.uuid).then(data => {
          if (data?.success) {
            toast(data?.success, {type: 'success'})
          }
        });

        
      }

      return (
        <DataTableRowActions  row={row} onDelete={deleteAssignEmployeeById} />
      )
    } 
  },
]