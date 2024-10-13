import { z } from "zod";


export const CreateMaterialSchema = z.object({
    uuid: z.string().optional(),
    name: z.string().min(1, 'This field is required'),
    description: z.string().optional(),
    status: z.enum(['paid', 'unpaid', 'partially']).default('paid'), 
    supplier: z.string().optional(),
    date: z.date().optional(),
    projectId: z.string().optional(),
    materialInfo: z.array(z.object({
        uuid: z.string().optional(),
        name: z.string().min(1),
        price: z.preprocess(
            (value) => Number(value),
            z.number().min(1, 'This field is required')
            ),
    }))
})