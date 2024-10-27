import { getEmployees } from '@/actions/Model/employee'
import EmployeeProjectOverview from '@/components/clients/subpages/employee-project-overview/EmployeeProjectOverview'
import React from 'react'

const EmployeesProject = async () => {
    const employees = await getEmployees()
  return (
    <div>
        <EmployeeProjectOverview employees={employees} />
    </div>
  )
}

export default EmployeesProject