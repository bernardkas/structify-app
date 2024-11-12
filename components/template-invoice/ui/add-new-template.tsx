'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface AddNewTemplateProps {
  currentUser?: any
}

const AddNewTemplate = ({currentUser}: AddNewTemplateProps) => {
    const router = useRouter()
    const createNewTemplate = () => {
        router.push('/invoice/new')
    }
    const isTrial = currentUser?.subscription === 'TRIAL';
  return (
    <div >
         <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              disabled={isTrial}
              onClick={createNewTemplate}
              variant='default'>
              Add new template
            </Button>
          </TooltipTrigger>
          {isTrial && (
            <TooltipContent>
              <p>Upgrade your plan to add new clients</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
      </div>
  )
}

export default AddNewTemplate