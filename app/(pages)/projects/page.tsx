'use server'
import { getClients } from '@/actions/Model/clients'
import { getProjects } from '@/actions/Model/project'
import CreateProjectButton from '@/components/projects/CreateProjectButton'
import ProjectsOverview from '@/components/projects/ProjectsOverview'
import Title from '@/components/ui-reusable/title'
import React from 'react'

const Projects = async () => {
  const projects = await getProjects()
  const clients = await getClients()  
  
  return (
    <div className="mx-5">
      <div className='flex flex-row justify-between items-center mt-3'>
        <Title>
          Projects
        </Title>
        {/* @ts-ignore */}
        <CreateProjectButton clients={clients} />
      </div>
        <div className="border-[2px] my-5 w-full"></div>
      <div>
       <ProjectsOverview projects={projects} /> 
      </div>
    </div>
  )
}

export default Projects