import { getAssignEmployee } from '@/actions/Model/assign-employee';
import { getEmployees } from '@/actions/Model/employee';
import { getProjects } from '@/actions/Model/project';
import { auth } from '@/auth';
import AssignEmployeesOverview from '@/components/employees/assign-employee/AssignEmployee';
import React from 'react';

const AssignEmployeePage = async () => {
  const employees = await getEmployees();
  const projects = await getProjects();
  const assignEmployees = await getAssignEmployee();
  const currentUser = await auth()
  return (
    <div>
      <AssignEmployeesOverview
    //   @ts-ignore
        assignEmployees={assignEmployees}
        employees={employees}
        projects={projects}
        currentUser={currentUser?.user}
      />
    </div>
  );
};

export default AssignEmployeePage;
