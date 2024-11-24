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
import { useTranslations } from "next-intl"


const tr = (value: string) => {
  const t = useTranslations('Material.form');

  return t(value)
}

export const columns: ColumnDef<Material>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={tr('name')} />
    ),
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={tr('status')} />
    ),
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "supplier",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={tr('supplier')} />
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