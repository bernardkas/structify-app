import { z } from "zod";


export const CreateClientSchema = z.object({
    name: z.string().min(1, 'This field is required'),
    organization: z.string(),
    color: z.string().optional(),
    status: z.enum(['active', 'inactive']).default('inactive'), 
    date: z.date().optional(),
    address: z.object({
        street: z.string().min(1, 'This field is required'),
        city: z.string().optional(),
        state: z.string().optional(),
        zip: z.string().min(1, 'This field is required'),
        country: z.string().optional(),
      }),
  });