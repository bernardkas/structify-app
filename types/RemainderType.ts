import { Client, Remainder } from '@prisma/client';
  
  export interface RemainderWithDetials extends Remainder {
    client: Client
  }
  
  