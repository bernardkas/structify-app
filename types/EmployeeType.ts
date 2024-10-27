import { Address, Employee, EmployeeHours, User } from '@prisma/client';
  
  export interface EmployeeWithDetails extends Employee {
    address: Address | null;
    user: User | null;
  }
  

  export interface EmployeeHoursWithDetails extends EmployeeHours {
    employee: EmployeeWithDetails
  }