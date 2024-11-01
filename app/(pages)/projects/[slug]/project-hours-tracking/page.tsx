import { getProjectById } from '@/actions/Model/project'
import { getProjectHoursByProjectId } from '@/actions/Model/project-hours'
import ProjectHoursTracking from '@/components/projects/subpages/work-hours-tracking/ProjectHoursTracking'
import React from 'react'

type WorkHoursTrackingPageProps = {
    params: {
        slug: string
    }
}

const ProjectWorkTrackingPage = async ({params}: WorkHoursTrackingPageProps) => {
    const project = await getProjectById(params) 
    const workHoursTracking = await getProjectHoursByProjectId(params.slug) 
        
  return (
    <div>
        <ProjectHoursTracking project={project} hours={workHoursTracking} /> 
    </div>
  )
}

export default ProjectWorkTrackingPage