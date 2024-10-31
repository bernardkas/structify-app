'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

const AddNewTemplate = () => {
    const router = useRouter()
    const createNewTemplate = () => {
        router.push('/invoice/new')
    }
  return (
    <div >
        <Button onClick={createNewTemplate}>Add new template</Button>
      </div>
  )
}

export default AddNewTemplate