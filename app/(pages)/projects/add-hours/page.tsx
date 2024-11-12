import { getProjects } from '@/actions/Model/project'
import { getProjectsHours } from '@/actions/Model/project-hours'
import { auth } from '@/auth'
import AddProjectHours from '@/components/projects/add-hours-project/AddProjectHours'
import React from 'react'
import { currentUser } from './../../../../lib/auth';

const AddHoursPage = async () => {
    const projectHours = await getProjectsHours()
    const projects = await getProjects()
    const currentUser = await auth()
  return (
    <div>
        <AddProjectHours projectHours={projectHours} projects={projects} currentUser={currentUser} />
    </div>
  )
}

export default AddHoursPage