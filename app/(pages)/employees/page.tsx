import { getEmployees } from '@/actions/Model/employee'
import { auth } from '@/auth';
import EmployeeOverview from '@/components/employees/EmployeeOverview'
import React from 'react'

const Employees = async () => {
  const employees = await getEmployees(); 
  const currentUser = await auth()
  return (
    <div className="mx-5">
      <div>
       <EmployeeOverview employees={employees} currentUser={currentUser}  /> 
      </div>
      
    </div>
  )
}

export default Employees