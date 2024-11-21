"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui-reusable/datatable/datatable-column-header"
import { DataTableRowActions } from "@/components/ui-reusable/datatable/datatable-row-action"
import { Client, Remainder } from "@prisma/client"
import { toast } from "react-toastify"
import { useFormattedDate } from "@/lib/use-formatted-date"
import { deleteRemainder } from "@/actions/Model/remainder/remainder"
import {useTranslations} from 'next-intl'


const tr = (value: string) => {
  const t = useTranslations('Remainders.form');

  return t(value)
}

export const columns: ColumnDef<Remainder>[] = [
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
    accessorKey: "startDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={tr('startDate')} />
    ),
    cell: ({ row }) => {
        const date = row.getValue("startDate")
        
        return (
            // @ts-ignore
            <div>{date ? useFormattedDate(date) : ''}</div>
        )
    },
  },
  {
    accessorKey: "frequency",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={tr('frequency')} />
    ),
    cell: ({ row }) => <div>{row.getValue("frequency")}</div>,
  },
  {
    accessorKey: "reminderTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={tr('reminderTime')} />
    ),
    cell: ({ row }) => <div>{row.getValue("reminderTime")}</div>,
  },  
  {
    id: "actions",
    accessorKey: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => {
      const deleteRemainderById = () => {
        deleteRemainder(row.original.uuid).then(data => {
          if (data?.success) {
            toast(data?.success, {type: 'success'})
          }
        });

        
      }

      return (
        <DataTableRowActions  row={row} onDelete={deleteRemainderById} />
      )
    } 
  },
]