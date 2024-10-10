import { getProjects } from '@/actions/Model/project'
import CreateProjectButton from '@/components/projects/CreateProjectButton'
import ProjectsOverview from '@/components/projects/ProjectsOverview'
import Title from '@/components/ui-reusable/title'
import React from 'react'

const Projects = () => {
  const projects = getProjects()
  return (
    <div className="mx-5">
      <div className='flex flex-row justify-between items-center mt-3'>
        <Title>
          Projects
        </Title>
        <CreateProjectButton />
      </div>
        <div className="border-[2px] my-5 w-full"></div>
      <div>
       <ProjectsOverview projects={projects} /> 
      </div>
    </div>
  )
}

export default Projects