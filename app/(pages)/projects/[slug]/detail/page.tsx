import { getClients } from '@/actions/Model/clients';
import { getProjectById } from '@/actions/Model/project';
import ProjectForm from '@/components/projects/ProjectForm';
import Title from '@/components/ui-reusable/title'
import React from 'react'

interface DetailProps {
  params: any;
}
const Detail = async ({params}: DetailProps) => {
  const project = await getProjectById(params)
  const clients = await getClients()  
  return (
    <div className="space-y-5 mb-5">
      <Title>
        Detail
      </Title>
      <div className="max-w-[600px]">

       <ProjectForm isEditing={true} project={project} 
      //  @ts-ignore
       clients={clients} /> 
      </div>
    </div>
  )
}

export default Detail