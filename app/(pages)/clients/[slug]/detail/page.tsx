import { getClientById } from '@/actions/Model/clients';
import ClientForm from '@/components/clients/ClientForm'
import Title from '@/components/ui-reusable/title'
import React from 'react'

interface DetailProps {
  params: any;
}
const Detail = async ({params}: DetailProps) => {
  const client = await getClientById(params)
  return (
    <div className="space-y-5 mb-5">
      <Title>
        Detail
      </Title>
      <div className="max-w-[600px]">

       <ClientForm isEditing={true} client={client} />
      </div>
    </div>
  )
}

export default Detail