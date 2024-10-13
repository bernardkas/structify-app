

import { z } from "zod";


export const CreateBudgetCostSchema = z.object({
    uuid: z.string().optional(),
    name: z.string().min(1, 'This field is required'),
    projectId: z.string().optional(),
    totalBudget: z.preprocess(
        (value) => Number(value),
        z.number().min(1, 'This field is required')
    ),
    costsIncurred: z.preprocess(
        (value) => Number(value),
        z.number().min(1, 'This field is required')
    ),
    costOverruns: z.preprocess(
        (value) => Number(value),
        z.number().min(1, 'This field is required')
     ),
    estimatedCosts: z.array(z.object({
      uuid: z.string().optional(),
      type: z.string().min(1, 'This field is required'),
      amount:  z.preprocess(
        (value) => Number(value),
        z.number().min(1, 'This field is required')
     ),
    })),
  });