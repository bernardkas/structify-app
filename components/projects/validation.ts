import { z } from "zod";


export const CreateProjectSchema = z.object({
    uuid: z.string().optional(),
    name: z.string().min(1, 'This field is required'),
    description: z.string(),
    color: z.string().optional(),
    startDate: z.date().optional(),
    projectType: z.string().optional(),
    projectStatus: z.string().optional(),
    description: z.string().optional(),
    clientId: z.string().optional(),
    address: z.object({
        id: z.string().optional(),
        street: z.string().min(1, 'This field is required'),
        city: z.string().optional(),
        state: z.string().optional(),
        zip: z.string().min(1, 'This field is required'),
        country: z.string().optional(),
      }),
  });