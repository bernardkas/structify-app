
import React from 'react'
import Autocomplete from '../ui-reusable/autocomplete'
import { getClients } from '@/actions/Model/clients'

const ClientAutocomplete =  () => {
  // const clients = await getClients()

  const handleClientSelect = (value: string) => {
    console.log('Selected Client:', value); 
  };

  return (
    <div>
       <Autocomplete data={['Test 1','test 2']} onSelect={handleClientSelect} placeholder="Search clients..." />
    </div>
  )
}

export default ClientAutocomplete