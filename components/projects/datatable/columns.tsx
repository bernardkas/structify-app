"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui-reusable/datatable/datatable-column-header"
import { DataTableRowActions } from "@/components/ui-reusable/datatable/datatable-row-action"
import { Client } from "@prisma/client"
import { archiveClient, deleteClient } from "@/actions/Model/clients"
import { toast } from "react-toastify"




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
    accessorKey: "projectId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Project ID" />
    ),
    cell: ({ row }) => <div>{row.getValue("projectId")}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  
  {
    accessorKey: "color",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Color" />
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
    accessorKey: "client.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Client name" />
    ),
    cell: ({ row }) => <div>{row.getValue("client.name")}</div>,
  },
  {
    accessorKey: "projectType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Project type" />
    ),
    cell: ({ row }) => <div>{row.getValue("projectType")}</div>,
  },  
  {
    accessorKey: "projectStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Project status" />
    ),
    cell: ({ row }) => <div>{row.getValue("projectStatus")}</div>,
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