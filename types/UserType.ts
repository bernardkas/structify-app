import { Client, Employee, Project, Remainder, Subscription, User } from '@prisma/client';
  
  export interface UserWithDetials extends User {
    client: Client[]
    subscriptions: Subscription[]
    employee: Employee[]

  }
  
  