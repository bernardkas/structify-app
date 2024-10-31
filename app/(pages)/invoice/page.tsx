import AddNewTemplate from '@/components/template-invoice/ui/add-new-template';
import React from 'react';
import TamplateOverview from '@/components/template-invoice/tamplate-overview';
import { getInvoices } from '@/actions/Model/invoice';

const TemplateInvoice = async () => {
  const invoices = await getInvoices()
  return (
    <div className='flex flex-col gap-5'>
      <div className='flex justify-end mt-5 mr-5'>
        <AddNewTemplate />
      </div>
      <div className='border-[2px]'></div>
      <div className='w-full'>
       <TamplateOverview invoices={invoices} />
      </div>
    </div>
  );
};

export default TemplateInvoice;
