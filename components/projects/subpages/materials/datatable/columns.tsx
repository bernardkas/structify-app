"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui-reusable/datatable/datatable-column-header"
import { DataTableRowActions } from "@/components/ui-reusable/datatable/datatable-row-action"
import { Client, Material } from "@prisma/client"
import { archiveClient, deleteClient } from "@/actions/Model/clients"
import { toast } from "react-toastify"
import { deleteProject } from "@/actions/Model/project"
import { BudgetWithDetials } from "@/types/BudgetCostTracking"
import { deleteBudgetAndCost } from "@/actions/Model/budget-cost-tracking"
import { deleteMaterial } from "@/actions/Model/material"




export const columns: ColumnDef<Material>[] = [
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
    accessorKey: "supplier",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Supplier" />
    ),
    cell: ({ row }) => <div>{row.getValue("supplier")}</div>,
  },
  {
    id: "actions",
    accessorKey: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => {
      const deleteMaterialById = () => {
        deleteMaterial(row.original.uuid).then(data => {
          if (data?.success) {
            toast(data?.success, {type: 'success'})
          }
        });
      }

      return (
        <DataTableRowActions  row={row} onDelete={deleteMaterialById} />
      )
    } 
  },
]