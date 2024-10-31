import {  Invoice, InvoiceDescription } from '@prisma/client';
  
  export interface InvoiceWithDetails extends Invoice {
    descriptions: InvoiceDescription[]
  }
  

  