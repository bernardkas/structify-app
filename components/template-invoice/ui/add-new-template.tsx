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
import { useTranslations } from 'next-intl';

interface AddNewTemplateProps {
  currentUser?: any
}

const AddNewTemplate = ({currentUser}: AddNewTemplateProps) => {
    const router = useRouter()
    const createNewTemplate = () => {
        router.push('/invoice/new')
    }
    const isTrial = currentUser?.subscription === 'TRIAL';

    const t = useTranslations('Invoice');

  return (
    <div >
         <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              disabled={isTrial}
              onClick={createNewTemplate}
              variant='default'>
            {t('addNewInvoice')}
            </Button>
          </TooltipTrigger>
          {isTrial && (
            <TooltipContent>
              <p>{t('upgradePlan')}</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
      </div>
  )
}

export default AddNewTemplate