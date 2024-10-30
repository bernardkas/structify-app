'use server';
import { auth } from "@/auth";
import { CreateAssignEmployeeSchema } from "@/components/employees/assign-employee/validation";
import prisma from "@/db/db"
import { revalidatePath } from "next/cache";
import { z } from "zod";


export const getAssignEmployee = async () => {
    const user = await auth();
    const response = await prisma.assignEmployee.findMany({
        where:{
            employee: {
                userId: user?.user?.id,
              },
        },
        include: {
            employee: true,
            project: true
        }
    })

    return response
}


export const createAssignEmployee = async (
    values: z.infer<typeof CreateAssignEmployeeSchema>
  ) => {
    const validateFields = CreateAssignEmployeeSchema.safeParse(values);
    if (!validateFields.success) {
      return { error: 'Invalid fields' };
    }
  
    const { employeeId, projectId } = values;
  
  
    const existingEmployee = await prisma.employee.findUnique({
      where: {
        uuid: employeeId,
      },
    });

    const existingProject = await prisma.project.findUnique({
      where: {
        uuid: projectId,
      },
    });
  
    await prisma.assignEmployee.create({
      data: { 
        name: existingEmployee?.name,
        employeeId: existingEmployee?.id,
        projectId: existingProject?.id,
      },
    });
  
    revalidatePath('/employees/assign-employee');
    return { success: 'Assign employee successfully.' }; 
  };

  export const updateAssignEmployee = async (
    values: z.infer<typeof CreateAssignEmployeeSchema>
  ) => {
    const validateFields = CreateAssignEmployeeSchema.safeParse(values);
    if (!validateFields.success) {
      return { error: 'Invalid fields' };
    }
  
    const { uuid, employeeId, projectId } = values;
  
    const existingEmployee = await prisma.employee.findUnique({
      where: {
        uuid: employeeId,
      },
    });
  
    const existingProject = await prisma.project.findUnique({
      where: {
        uuid: projectId,
      },
    });
  
    await prisma.assignEmployee.update({
      where: {
        uuid: uuid,
      },
      data: {
        employeeId: existingEmployee?.id,
        name: existingEmployee?.name,
        projectId: existingProject?.id,
      },
    });
  
    revalidatePath('/employees/assign-employee');
    return { success: 'Assign employee updated successfully.' };
  };
  
  export const deleteAssignEmployee = async (id: string) => {
    await prisma.assignEmployee.delete({
      where: {
        uuid: id,
      },
    });
    revalidatePath('/employees/assign-employee');
    return { success: 'Assign employee delete successfully' };
  };