import { Address, Employee, User } from '@prisma/client';
  
  export interface EmployeeWithDetails extends Employee {
    address: Address | null;
    user: User | null;
  }
  

  