import AddNewTemplate from '@/components/template-invoice/ui/add-new-template';
import React from 'react';
import TamplateOverview from '@/components/template-invoice/tamplate-overview';
import { getInvoices } from '@/actions/Model/invoice';
import Title from '@/components/ui-reusable/title';
import { auth } from '@/auth';

const TemplateInvoice = async () => {
  const invoices = await getInvoices()
  const currentUser = await auth()
  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-row justify-between items-center mt-5 mx-5'>
        <Title>Invoice</Title>
        <AddNewTemplate currentUser={currentUser?.user}  />
      </div>
      <div className='border-[2px]'></div>
      <div className='w-full'>
       <TamplateOverview invoices={invoices} />
      </div>
    </div>
  );
};

export default TemplateInvoice;
