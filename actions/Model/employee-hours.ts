'use server'
import { auth } from '@/auth';
import { CreateAddHoursEmployeeSchema } from '@/components/employees/add-hours/validation';
import prisma from '@/db/db';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export const getEmployeeHours = async () => {
    const user = await auth();

  const response = await prisma.employeeHours.findMany({
    include: {
      employee: true,
    },
    where: {
        employee: {
            userId: user?.user?.id
        }
      },
    orderBy: {
        createdAt: 'desc',
      }
  });
  return response;
};

export const getEmployeeHoursById = async (id: string) => {
  const response = await prisma.employeeHours.findUnique({
    where: {
      id: id,
    },
    include: {
      employee: true,
    },
  });
  return response;
};

export const createEmployeeHours = async (
  values: z.infer<typeof CreateAddHoursEmployeeSchema>
) => {
  const validateFields = CreateAddHoursEmployeeSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: 'Invalid fields' };
  }

  const { employeeId, hours, description, date } = values;

  const existingEntry = await prisma.employeeHours.findFirst({
    where: {
      employeeId,
      date,
    },
  });

  if (existingEntry) {
    return { error: 'Hours already logged for this date.' };
  }

  const existingEmployee = await prisma.employee.findUnique({
    where: {
      uuid: employeeId
    },
  });

  await prisma.employeeHours.create({
    data: {
      employeeId: existingEmployee?.id,
      hours,
      description,
      date,
    },
  });

  revalidatePath('/employees/add-hours');
  return { success: 'Hours logged successfully.' };
};

export const updateEmployeeHours = async (values: z.infer<typeof CreateAddHoursEmployeeSchema>) => {
    const validateFields = CreateAddHoursEmployeeSchema.safeParse(values);
    if (!validateFields.success) {
      return { error: 'Invalid fields' };
    }
  
    const { uuid, employeeId, hours, description, date } = values;
  
    const existingEmployee = await prisma.employee.findUnique({
      where: {
        uuid: employeeId
      },
    });

    await prisma.employeeHours.update({
        where: {
          uuid: uuid
        },
        data: {
            employeeId: existingEmployee?.id,
          hours,
          description,
          date,
        },
      });


      revalidatePath('/employees/add-hours');
      return { success: 'Hours updated successfully.' };
};

export const deleteEmployeeHours = async (id: string) => {
  await prisma.employeeHours.delete({
    where: {
      uuid: id,
    },
  });
  revalidatePath('/employees/add-hours');
return {success: "Hours deleted successfully"}
};
