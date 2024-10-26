'use server'
import { auth } from "@/auth"
import { CreateEmployeeSchema } from "@/components/employees/validation"
import prisma from "@/db/db"
import { revalidatePath } from "next/cache"
import { z } from "zod"


export const getEmployees = async () => {
    const user = await auth()
  if (!user) {
    return { error: 'User not found' }
  }

  const response = await prisma.employee.findMany({
    where: {
        userId: user.user?.id
      },
        include: {
          address: true
        },
        orderBy: {
          createdAt: 'desc',
        },
  })
  return response
}

export const getEmployeeById = async (id: string) => {
  const response = await prisma.employee.findUnique({
    where: {
      uuid: id
    },
    include: {
      address: true
    },
  })
  return response
}

export const createEmployee = async (values: z.infer<typeof CreateEmployeeSchema>) => {
    const validateFields = CreateEmployeeSchema.safeParse(values)
    if (!validateFields.success) {
      return { error: 'Invalid fields' }
    }

    const existingUser = await auth();

    if (!existingUser) {
      return { error: 'User not found' };
    }

    const {
        name,
        email,
        phone,
        color,
        hourlyRate,
        salary,
        jobTitle,
        startedMonth,
        address: {
            street,
            city,
            state,
            zip,
            country
        }
    } = values
  await prisma.employee.create({
    data: {
      name,
      email,
      phone,
      hourlyRate,
      salary,
      jobTitle,
      color,
      startedMonth,
      address: {
        create: {
          street,
          city,
          state,
          zip,
          country
        }
      },
      user: {
        connect: {
          id: existingUser.user?.id,
        }
      }
    },
  })
  revalidatePath('/employees')
  return {success: "Employee created successfully"}
}


export const updateEmployee = async (values: z.infer<typeof CreateEmployeeSchema>) => {
    const validateFields = CreateEmployeeSchema.safeParse(values)
    if (!validateFields.success) {
      return { error: 'Invalid fields' }
    }

    const existingUser = await auth();

    if (!existingUser) {
      return { error: 'User not found' };
    }

    const {
        uuid,
        name,
        email,
        phone,
        hourlyRate,
        salary,
        color,
        jobTitle,
        startedMonth,
        address: {
            id,
            street,
            city,
            state,
            zip,
            country
        }
    } = values

    console.log('valuess', values)
  await prisma.employee.update({
    where: {
      uuid: uuid
    },
    data: {
      name,
      email,
      phone,
      hourlyRate,
      salary,
      jobTitle,
      color,
      startedMonth,
      address: {
        upsert: {
          where: {
            id: id || ''
          },
          create: {
            street,
            city,
            state,
            zip,
            country
          },
          update: {
            street,
            city,
            state,
            zip,
            country
          },
        }
      },
      user: {
        connect: {
          id: existingUser.user?.id,
        }
      }
    },
  })
  
  revalidatePath('/employees')
  return {success: "Employee updated successfully"}
}   


export const deleteEmployee = async (uuid: string) => {
  await prisma.employee.delete({
    where: {
      uuid: uuid
    }
  })
  revalidatePath('/employees')
  return {success: "Employee deleted successfully"}
}