"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui-reusable/datatable/datatable-column-header"
import { DataTableRowActions } from "@/components/ui-reusable/datatable/datatable-row-action"
import { Client, Documents } from "@prisma/client"
import { archiveClient, deleteClient } from "@/actions/Model/clients"
import { toast } from "react-toastify"
import { deleteProject } from "@/actions/Model/project"
import { deletePlansBlueprint } from "@/actions/Model/plans-blueprints"
import { useTranslations } from "next-intl"


const tr = (value: string) => {
  const t = useTranslations('BudgetAndCost.form');

  return t(value)
}

export const columns: ColumnDef<Documents>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={tr('name')} />
    ),
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={tr('type')} />
    ),
    cell: ({ row }) => <div>{row.getValue("type")}</div>,
  },
  {
    id: "actions",
    accessorKey: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => {
      const deletePlansBlueprintById = () => {
        deletePlansBlueprint(row.original.uuid).then(data => {
          if (data?.success) {
            toast(data?.success, {type: 'success'})
          }
        });
      }

      return (
        <DataTableRowActions  row={row} onDelete={deletePlansBlueprintById} />
      )
    } 
  },
]