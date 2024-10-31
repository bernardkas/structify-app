import { getInvocieById } from '@/actions/Model/invoice';
import InvoiceEditor from '@/components/template-invoice/InvoiceEditor'
import React from 'react'

const Detail = async (params:any) => {
  const invoice = await getInvocieById(params);
  
  return (
    <div>
        <div>
            <InvoiceEditor getInvoiceById={invoice} isEditing={true} />
        </div>
    </div>
  )
}

export default Detail