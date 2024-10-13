import {  EstimatedCost, ProjectBudget } from '@prisma/client';
  
  export interface BudgetWithDetials extends ProjectBudget {
    estimatedCost: EstimatedCost
  }
  
  