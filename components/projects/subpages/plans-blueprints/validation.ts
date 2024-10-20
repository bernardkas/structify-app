

import { z } from "zod";


export const CreatePlansBlueprintsSchema = z.object({
    uuid: z.string().optional(),
    name: z.string().min(1, 'This field is required'),
    projectId: z.string().optional(),
    type: z.string().optional(),
    file:z.any(),
  });