import { getProjects } from '@/actions/Model/project'
import { getProjectsHours } from '@/actions/Model/project-hours'
import AddProjectHours from '@/components/projects/add-hours-project/AddProjectHours'
import React from 'react'

const AddHoursPage = async () => {
    const projectHours = await getProjectsHours()
    const projects = await getProjects()
  return (
    <div>
        <AddProjectHours projectHours={projectHours} projects={projects} />
    </div>
  )
}

export default AddHoursPage