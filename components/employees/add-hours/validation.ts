
import { z } from 'zod'

export const CreateAddHoursEmployeeSchema = z.object({
    uuid: z.string().optional(),
    employeeId: z.string().min(1),
    hours:  z.preprocess(
        (value) => Number(value),
        z.number().min(1, 'This field is required')
    ),
    minutes:  z.preprocess(
        (value) => Number(value),
        z.number().optional()
    ),
    description: z.string().min(1),
    date: z.date().min(new Date()),
})