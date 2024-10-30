import { z } from "zod";


export const CreateAssignEmployeeSchema = z.object({
    uuid: z.string().optional(),
    employeeId: z.string().min(1),
    projectId: z.string().min(1),
})