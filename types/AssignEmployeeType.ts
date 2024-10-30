import { AssignEmployee, Employee, Project } from '@prisma/client';
  
  export interface AssignEmployeeWithDetails extends AssignEmployee {
    employee: Employee | null,
    project: Project | null
  }
  