import { getEmployeeById } from '@/actions/Model/employee';
import EmployeeForm from '@/components/employees/EmployeeForm'
import React from 'react'

type EmployeeDetialProps = {
  params: {
    slug: string;
  };
}

const EmployeeDetailPage = async ({ params }: EmployeeDetialProps) => {
  const employee = await getEmployeeById(params.slug)
  return (
    <div>
       <EmployeeForm isEditing={true}  employee={employee} /> 
    </div>
  )
}

export default EmployeeDetailPage