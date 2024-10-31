import InvoiceEditor from '@/components/template-invoice/InvoiceEditor'
import React from 'react'

const NewTemplate = () => {
  return (
    <div>
        <div>
        <InvoiceEditor isEditing={false} />
        </div>
    </div>
  )
}

export default NewTemplate