import { getClientById } from '@/actions/Model/clients';
import ClientForm from '@/components/clients/ClientForm'
import Title from '@/components/ui-reusable/title'
import { useTranslations } from 'next-intl';
import React from 'react'

interface DetailProps {
  params: any;
}
const Detail = async ({params}: DetailProps) => {
  const client = await getClientById(params)

  const Header = () => {
    const t = useTranslations('Client');
    return <Title>{t('detail')}</Title>;
  }

  return (
    <div className="space-y-5 mb-5">
     <Header />
      <div className="max-w-[600px]">

       <ClientForm isEditing={true} client={client} />
      </div>
    </div>
  )
}

export default Detail