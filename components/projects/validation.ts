import { z } from "zod";


export const CreateProjectSchema = z.object({
    uuid: z.string().optional(),
    name: z.string().min(1, 'This field is required'),
    description: z.string(),
    color: z.string().optional(),
    startDate: z.date().optional(),
    projectType: z.string().optional(),
    projectStatus: z.string().optional(),
    clientId: z.string().min(1),
    address: z.object({
        street: z.string().min(1, 'This field is required'),
        city: z.string().optional(),
        state: z.string().optional(),
        zip: z.string().min(1, 'This field is required'),
        country: z.string().optional(),
      }),
  });