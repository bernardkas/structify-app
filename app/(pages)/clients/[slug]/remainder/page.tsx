import { getRemainders } from '@/actions/Model/remainder'
import Remainder from '@/components/clients/subpages/remainder/Remainder'
import React from 'react'

type SubpageRemainderProps = {
  params: {
    slug: string;
  };
};
const SubpageRemainder = async ({params}: SubpageRemainderProps) => {
  const clientId = params.slug
  const remainders = await getRemainders(clientId)

  console.log('reminders', remainders)
  return (
    <div>
      <Remainder remainders={remainders} clientId={clientId} />
    </div>
  )
}

export default SubpageRemainder