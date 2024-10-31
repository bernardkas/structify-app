"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { toast } from "react-toastify"
import { deleteInvocieById } from "@/actions/Model/invoice"

export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "invoiceNumber",
    header: "Invoide Number",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "companyName",
    header: "companyName",
  },
  {
    accessorKey: "city",
    header: "city",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const invoice = row.original as Payment;

      const [isClient, setIsClient] = useState(false);

      useEffect(() => {
        setIsClient(true); 
      }, []);

      const handleDelete = () => {
        console.log(`Deleting payment with id: ${invoice.id}`);
        deleteInvocieById(invoice.id).then(inv => {
          if (inv?.success) {
            toast(inv?.success, { type: 'success' });
          }
        })
      };

      if (!isClient) return null; 

      return React.createElement(
        DropdownMenu,
        null,
        React.createElement(
          DropdownMenuTrigger,
          { asChild: true },
          React.createElement(
            Button,
            { variant: "ghost", className: "h-8 w-8 p-0" },
            React.createElement(MoreHorizontal, { className: "h-4 w-4" })
          )
        ),
        React.createElement(
          DropdownMenuContent,
          null,
          React.createElement(
            DropdownMenuItem,
            { onClick: handleDelete },
            "Delete"
          )
        )
      );
    },
  },
]
