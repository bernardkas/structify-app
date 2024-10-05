import { getRemainders } from '@/actions/Model/remainder'
import Remainder from '@/components/clients/subpages/remainder/Remainder'
import React from 'react'

type SubpageRemainderProps = {
  params: {
    slug: string;
  };
};
const SubpageRemainder = async ({params}: SubpageRemainderProps) => {
  const remainders = await getRemainders()
  const clientId = params.slug

  console.log('reminders', remainders)
  return (
    <div>
      <Remainder remainders={remainders} clientId={clientId} />
    </div>
  )
}

export default SubpageRemainder