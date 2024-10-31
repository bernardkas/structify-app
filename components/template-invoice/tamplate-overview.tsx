'use client'
import React from 'react'
import { columns } from '@/app/(pages)/invoice/datatable/columns'
import { Invoice } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { DataTable } from '../ui-reusable/datatable/datatable'



interface TamplateOverviewProps {
  invoices: Invoice[]
}

const TamplateOverview = ({invoices}: TamplateOverviewProps) => {
    const router = useRouter()
    const onClickRow = (row: any) => {
        router.push(`/invoice/detail/${row.id}`)
      }
  
    return (
    <div className='mx-2'>
        <DataTable columns={columns} data={invoices} onRowClick={onClickRow} />
      </div>
  )
}

export default TamplateOverview