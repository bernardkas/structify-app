import { z } from "zod";


export const CreateClientSchema = z.object({
    uuid: z.string().optional(),
    name: z.string().min(1, 'This field is required'),
    organization: z.string(),
    color: z.string().optional(),
    phone: z.string().min(1),
    email: z.string().email().optional(),
    status: z.enum(['ACTIVE', 'INACTIVE']).default('INACTIVE'),  
    date: z.date().optional(),
    address: z.object({
        street: z.string().min(1, 'This field is required'),
        city: z.string().optional(),
        state: z.string().optional(),
        zip: z.string().min(1, 'This field is required'),
        country: z.string().optional(),
      }),
  });