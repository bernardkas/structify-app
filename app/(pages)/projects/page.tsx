import { getClients } from '@/actions/Model/clients'
import { getProjects } from '@/actions/Model/project'
import { auth } from '@/auth'
import CreateProjectButton from '@/components/projects/CreateProjectButton'
import ProjectsOverview from '@/components/projects/ProjectsOverview'
import Title from '@/components/ui-reusable/title'
import React from 'react'
import { currentUser } from './../../../lib/auth';
import { useTranslations } from 'next-intl'

const Projects = async () => {
  const projects = await getProjects()
  const clients = await getClients()  
  const currentUser = await auth()

  const Header = () => {
    const t = useTranslations('Project'); 

    return  <Title>
    {t('title')}
  </Title>
  }
  
  return (
    <div className="mx-5">
      <div className='flex flex-row justify-between items-center mt-3'>
       <Header />
        {/* @ts-ignore */}
        <CreateProjectButton clients={clients} currentUser={currentUser} />
      </div>
        <div className="border-[2px] my-5 w-full"></div>
      <div>
       <ProjectsOverview projects={projects} /> 
      </div>
    </div>
  )
}

export default Projects