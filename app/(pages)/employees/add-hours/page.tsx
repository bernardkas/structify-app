import { getEmployees } from '@/actions/Model/employee'
import { getEmployeeHours } from '@/actions/Model/employee-hours'
import AddHour from '@/components/employees/add-hours/AddHour'
import React from 'react'
import { Employee } from '@prisma/client';

const AddHours = async () => {
  const employees = await getEmployees()
  const employeeHours = await getEmployeeHours()
  return (
    <div>
      <AddHour  employees={employees} employeeHours={employeeHours} />
    </div>
  )
}

export default AddHours