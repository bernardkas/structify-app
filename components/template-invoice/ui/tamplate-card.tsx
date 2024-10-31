'use client'
import { useRouter } from 'next/navigation';
import React from 'react'


interface TamplateCardProps {
  children: React.ReactNode;
  invoiceId: string
}

const TamplateCard = ({children, invoiceId}: TamplateCardProps) => {
    const router = useRouter()
  const goToDetail = (id: string) => {
    router.push(`/template-invoice/detail/${id}`)
  }
  return (
    <div onClick={() => goToDetail(invoiceId)}>
    {children}
  </div>
  )
}

export default TamplateCard