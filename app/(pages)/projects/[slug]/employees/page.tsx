import { getEmployees } from '@/actions/Model/employee'
import { getEmployeeByProjectId } from '@/actions/Model/project'
import EmployeeProjectOverview from '@/components/projects/subpages/employee-project-overview/EmployeeProjectOverview'
import React from 'react'

type EmployeesProjectProps = {
    params: {
      slug: string
    }
}

const EmployeesProject = async ({ params }: EmployeesProjectProps) => {
    const employees = await getEmployeeByProjectId(params.slug)
  return (
    <div>
        <EmployeeProjectOverview employees={employees} />
    </div>
  )
}

export default EmployeesProject