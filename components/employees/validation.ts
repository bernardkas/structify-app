import { start } from 'repl';
import { z } from 'zod';

export const CreateEmployeeSchema = z.object({
  uuid: z.string().optional(),
  name: z.string().min(1, 'This field is required'),
  email: z.string().email().optional(),
  phone: z.string().min(1, 'This field is required'),
  hourlyRate: z.preprocess(
    (value) => Number(value),
    z.number().optional()
    ),
  salary: z.preprocess(
    value => Number(value),
    z.number().optional()
  ),
  jobTitle: z.string().optional(),
  startedMonth: z.date().optional(),
  address: z.object({
    id: z.string().optional(),
    street: z.string().min(1, 'This field is required'),
    city: z.string().optional(),
    state: z.string().optional(),
    zip: z.string().min(1, 'This field is required'),
    country: z.string().optional(),
  }),
});
