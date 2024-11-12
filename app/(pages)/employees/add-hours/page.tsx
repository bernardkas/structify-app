import { getEmployees } from '@/actions/Model/employee'
import { getEmployeeHours } from '@/actions/Model/employee-hours'
import AddHour from '@/components/employees/add-hours/AddHour'
import React from 'react'
import { Employee } from '@prisma/client';
import { auth } from '@/auth';

const AddHours = async () => {
  const employees = await getEmployees()
  const employeeHours = await getEmployeeHours()
  const currentUser = await auth()
  return (
    <div>
      <AddHour  employees={employees} employeeHours={employeeHours} currentUser={currentUser?.user} />
    </div>
  )
}

export default AddHours