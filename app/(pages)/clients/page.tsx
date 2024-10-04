import { getClients } from '@/actions/Model/clients'
import ClientOverview from '@/components/clients/ClientOverview'
import CreateClientButton from '@/components/clients/CreateClientButton'
import { columns } from '@/components/clients/datatable/columns'
import { DataTable } from '@/components/ui-reusable/datatable/datatable'
import Title from '@/components/ui-reusable/title'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Clients = async () => {
  const clients = await getClients()

  console.log('clients', clients)
  return (
    <div className="mx-5">
      <div className='flex flex-row justify-between items-center mt-3'>
        <Title>
          Clients
        </Title>
        <CreateClientButton />
      </div>
        <div className="border-[2px] my-5 w-full"></div>
      <div>
       <ClientOverview clients={clients} />
      </div>
    </div>
  )
}

export default Clients