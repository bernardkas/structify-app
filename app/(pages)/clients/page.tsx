import { getClients } from '@/actions/Model/clients';
import { auth } from '@/auth';
import ClientOverview from '@/components/clients/ClientOverview';
import CreateClientButton from '@/components/clients/CreateClientButton';
import Title from '@/components/ui-reusable/title';
import { useTranslations } from 'next-intl';
import React from 'react';

const Clients = async () => {
  const clients = await getClients();
  const currentUser = await auth();

  const Header = () => {
    const t = useTranslations('Client');
    return <Title>{t('title')}</Title>;
  };


  return (
    <div className='mx-5'>
      <div className='flex flex-row justify-between items-center mt-3'>
        <Header />
        <CreateClientButton currentUser={currentUser} />
      </div>
      <div className='border-[2px] my-5 w-full'></div>
      <div>
        <ClientOverview clients={clients} />
      </div>
    </div>
  );
};

export default Clients;
