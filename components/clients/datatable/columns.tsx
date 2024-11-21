"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui-reusable/datatable/datatable-column-header"
import { DataTableRowActions } from "@/components/ui-reusable/datatable/datatable-row-action"
import { Client } from "@prisma/client"
import { archiveClient, deleteClient } from "@/actions/Model/clients"
import { toast } from "react-toastify"
import { useTranslations } from 'next-intl';



const tr = (value: string) => {
  const t = useTranslations('Client.form');

  return t(value)
}

export const columns: ColumnDef<Client>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
        onClick={(e) => e.stopPropagation()}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
        onClick={(e) => e.stopPropagation()}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "clientId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Client ID" />
    ),
    cell: ({ row }) => <div>{row.getValue("clientId")}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={tr("name")} />
    ),
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  
  {
    accessorKey: "color",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={tr("color")} />
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
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={tr("phone")} />
    ),
    cell: ({ row }) => <div>{row.getValue("phone")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={tr("status")} />
    ),
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },  
  {
    id: "actions",
    accessorKey: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => {
      const deleteClientById = () => {
        deleteClient(row.original.uuid).then(data => {
          if (data?.success) {
            toast(data?.success, {type: 'success'})
          }
        });
      }

      return (
        <DataTableRowActions  row={row} onDelete={deleteClientById} />
      )
    } 
  },
]