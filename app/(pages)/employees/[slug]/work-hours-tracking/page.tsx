import { getEmployeeById } from '@/actions/Model/employee'
import { getEmployeeHours, getEmployeeHoursByEmployeeId, getEmployeeHoursById } from '@/actions/Model/employee-hours'
import WorkHoursTracking from '@/components/employees/subpages/work-hours-tracking/WorkHoursTracking'
import React from 'react'

type WorkHoursTrackingPageProps = {
    params: {
        slug: string
    }
}

const WorkHoursTrackingPage = async ({params}: WorkHoursTrackingPageProps) => {
    const employee = await getEmployeeById(params.slug) 
    const workHoursTracking = await getEmployeeHoursByEmployeeId(params.slug) 
  return (
    <div>
        <WorkHoursTracking employee={employee} hours={workHoursTracking} />
    </div>
  )
}

export default WorkHoursTrackingPage