import { Address, AssignEmployee, Client, Documents, Material, Project, ProjectBudget, ProjectHours, User } from '@prisma/client';
  
  export interface ProjectWithDetails extends Project {
    address: Address | null;
    budget: ProjectBudget[];
    materials: Material[];
    documents: Documents[];
    assignEmployee: AssignEmployee[];
    client: Client[];
  }
  

  export interface ProjectHoursWithDetails extends ProjectHours {
    project: ProjectWithDetails
  }