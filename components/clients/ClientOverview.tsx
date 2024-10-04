'use client';

import React from 'react'
import { DataTable } from '../ui-reusable/datatable/datatable';
import { columns } from './datatable/columns';
import { useRouter } from 'next/navigation';

interface ClientOverviewProps {
  clients: any
}
const ClientOverview = ({clients}: ClientOverviewProps) => {
  const router = useRouter()
  const handleRowClick = (client: any) => {
    router.push(`/clients/${client.uuid}/detail`)
  }
  return (
    <div>
       <DataTable onRowClick={handleRowClick} columns={columns} data={clients} />
    </div>
  )
}

export default ClientOverview;