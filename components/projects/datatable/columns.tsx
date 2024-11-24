"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui-reusable/datatable/datatable-column-header"
import { DataTableRowActions } from "@/components/ui-reusable/datatable/datatable-row-action"
import { Client } from "@prisma/client"
import { archiveClient, deleteClient } from "@/actions/Model/clients"
import { toast } from "react-toastify"
import { deleteProject } from "@/actions/Model/project"
import { useTranslations } from "next-intl"


const tr = (value: string) => {
  const t = useTranslations('Project.form');

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
    accessorKey: "projectId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Project ID" />
    ),
    cell: ({ row }) => <div>{row.getValue("projectId")}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={tr('name')} />
    ),
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
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
    accessorKey: "client.name", 
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={tr('client')} />
    ),
    cell: ({ row }) => {
      // @ts-ignore
      const clientName = row?.original?.client?.name || "No client"; // Safely access the client object
      return <div>{clientName}</div>;
    },
  },
  {
    accessorKey: "projectType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={tr('projectType')} />
    ),
    cell: ({ row }) => <div>{row.getValue("projectType")}</div>,
  },  
  {
    accessorKey: "projectStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={tr('status')} />
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
      const deleteProjectById = () => {
        deleteProject(row.original.uuid).then(data => {
          if (data?.success) {
            toast(data?.success, {type: 'success'})
          }
        });
      }

      return (
        <DataTableRowActions  row={row} onDelete={deleteProjectById} />
      )
    } 
  },
]