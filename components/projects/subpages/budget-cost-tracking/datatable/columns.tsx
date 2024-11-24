"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui-reusable/datatable/datatable-column-header"
import { DataTableRowActions } from "@/components/ui-reusable/datatable/datatable-row-action"
import { Client } from "@prisma/client"
import { archiveClient, deleteClient } from "@/actions/Model/clients"
import { toast } from "react-toastify"
import { deleteProject } from "@/actions/Model/project"
import { BudgetWithDetials } from "@/types/BudgetCostTracking"
import { deleteBudgetAndCost } from "@/actions/Model/budget-cost-tracking"
import { useTranslations } from "next-intl"


const tr = (value: string) => {
  const t = useTranslations('BudgetAndCost.form');

  return t(value)
}

export const columns: ColumnDef<BudgetWithDetials>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={tr('name')} />
    ),
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "totalBudget",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={tr('totalBudget')} />
    ),
    cell: ({ row }) => <div>{row.getValue("totalBudget")}</div>,
  },
  {
    accessorKey: "costsIncurred",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={tr('costIncurred')} />
    ),
    cell: ({ row }) => <div>{row.getValue("costsIncurred")}</div>,
  },
  {
    accessorKey: "costOverruns",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={tr('costOverruns')} />
    ),
    cell: ({ row }) => <div>{row.getValue("costOverruns")}</div>,
  },
  {
    id: "actions",
    accessorKey: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => {
      const deleteBudgetCosttById = () => {
        deleteBudgetAndCost(row.original.uuid).then(data => {
          if (data?.success) {
            toast(data?.success, {type: 'success'})
          }
        });
      }

      return (
        <DataTableRowActions  row={row} onDelete={deleteBudgetCosttById} />
      )
    } 
  },
]