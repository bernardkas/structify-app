import { getEmployees } from '@/actions/Model/employee'
import EmployeeOverview from '@/components/employees/EmployeeOverview'
import React from 'react'

const Employees = async () => {
  const employees = await getEmployees(); 
  return (
    <div className="mx-5">
      <div>
       <EmployeeOverview employees={employees}  /> 
      </div>
      
    </div>
  )
}

export default Employees