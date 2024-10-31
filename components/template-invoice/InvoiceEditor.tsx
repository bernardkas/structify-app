'use client'
import React, { useState } from 'react'
import RightsidePdf from './RightsidePdf'
import Leftiside from './Leftiside'
import { toast } from 'react-toastify'
import { PDFViewer } from '@react-pdf/renderer';
import { createInvocie, updateInvocie } from '@/actions/Model/invoice'

interface InvoiceEditorProps {
  isEditing?: boolean;
  getInvoiceById?: any
}

const InvoiceEditor = ({isEditing, getInvoiceById}: InvoiceEditorProps) => {
  const [invoice, setInvoice] = useState<any>(getInvoiceById);
  const [loading, setLoading] = useState(false);


  const onSubmit = (formData: any) => {
    setLoading(true)
    if (isEditing) {
      updateInvocie(formData).then(data => {
        if (data?.success) {
          toast(data?.success, {type: 'success'});
          setLoading(false);
        }
        if (data?.error) {
          toast(data?.error, {type: 'error'});
          setLoading(false);
        }
      })
    } else {
      createInvocie(formData).then(data => {
        if (data?.success) {
          toast(data?.success, { type: 'success' });
          setLoading(false);
        }
        if (data?.error) {
          toast(data?.error, { type: 'error' });
          setLoading(false);
        }
      })
    }
  }


  return (
    <div className="flex flex-col h-full w-full mx-2">
    <div
      className={`${
        isEditing ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'flex justify-center'
      } h-[80vh]`}
    >
      {/* Left side component */}
      <div className={`${!isEditing ? "w-[800px]" : "w-full md:w-auto"}`}>
        <Leftiside loading={loading} invoice={getInvoiceById} onSubmit={onSubmit} isEditing={isEditing} />
      </div>

      {/* PDF Viewer component, visible only if editing */}
      {isEditing && (
        <div className="w-full h-[90vh]">
          <PDFViewer width="100%" height="100%">
            <RightsidePdf data={getInvoiceById} />
          </PDFViewer>
        </div>
      )}
    </div>
  </div>
  )
}

export default InvoiceEditor