import { Address, Client } from '@prisma/client';
  
  export interface ClientWithDetails extends Client {
    address: Address | null;
  }
  

  