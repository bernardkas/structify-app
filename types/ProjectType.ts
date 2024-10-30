import { Address, AssignEmployee, Client, Documents, Material, Project, ProjectBudget, User } from '@prisma/client';
  
  export interface ProjectWithDetails extends Project {
    address: Address | null;
    budget: ProjectBudget[];
    materials: Material[];
    documents: Documents[];
    assignEmployee: AssignEmployee[];
    client: Client[];
  }
  