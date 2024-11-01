import { Address, Employee, EmployeeHours, User } from '@prisma/client';
  
  export interface EmployeeWithDetails extends Employee {
    address: Address
    employeeHours: EmployeeHours
    user: User | null;
  }
  

  export interface EmployeeHoursWithDetails extends EmployeeHours {
    employee: EmployeeWithDetails
  }