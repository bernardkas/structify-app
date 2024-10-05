import { z } from "zod";


export const CreateRemainderSchema = z.object({
    uuid: z.string().optional(),
    name: z.string().min(1, 'This field is required'),
    description: z.string().optional(),
    clientId: z.string().optional(),
    startDate: z.date(),
    frequency: z.string().min(1, 'This field is required'),
    daysOfWeek: z.string().array().optional(),  
    daysOfMonth: z.string().array().optional(),  
    reminderType: z.string().optional(),  
    reminderTime: z.string().min(1),  
    emailRecipient: z.string().email().min(1, 'This field is required'),
    reminderMessage: z.string().optional(),
    status: z.enum(['ACTIVE', 'INACTIVE', 'PAUSED']).default('ACTIVE'), 
  });