'use client'
import { columns } from '@/components/employees/datatable/columns';
import { DataTable } from '@/components/ui-reusable/datatable/datatable';
import { useRouter } from 'next/navigation';
import React from 'react'

interface EmployeeProjectOverviewProps {
    employees: any;
}

const EmployeeProjectOverview = ({ employees }: EmployeeProjectOverviewProps) => {
  const router = useRouter()

  const handleRowClick = (row: any) => {
    router.push(`/employees/${row.uuid}/detail`)
  }
  
    return (
    <div>
        <DataTable columns={columns} data={employees} onRowClick={handleRowClick} />
    </div>
  )
}

export default EmployeeProjectOverview