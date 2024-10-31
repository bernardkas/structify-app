import { z } from "zod";


export const InvoiceTypeSchema = z.object({
    // Company information
    invoiceId: z.string().optional(),
    name: z.string().min(1),
    invoiceNumber: z.string().min(1),
    companyName: z.string().min(1),
    address: z.string().min(1),
    city: z.string().min(1),
    postCode: z.string().min(1),
    companyPhone: z.string().min(1),
    email: z.string().optional(),
    companyLogo: z.string().optional(),
    date: z.date().optional(),

    // Bill to
    clientName: z.string().min(1),
    clientCompanyName: z.string().optional(),
    clientAddress: z.string().min(1),
    clientPhone: z.string().optional(),
    clientEmail: z.string().optional(),
    richText: z.string().optional(),

    // Description

    descriptions: z.array(
      z.object({
        id: z.string().optional(),
        description: z.string().optional(),
        quantity: z.number().optional(),
        unitPrice: z.number().optional(),
        tax: z.number().optional(),
        totalPrice: z.number().optional(),
      })
    ).min(1, 'At least one description is required'),  

    // Payement
    subtotal: z.number().optional(),
    taxRate: z.number().optional(),
    totalTax: z.number().optional(),
    fullPrice: z.number().optional(),
  });