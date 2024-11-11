'use server';
import { auth } from '@/auth';
import { CreateAddHoursProjectSchema } from '@/components/projects/add-hours-project/validation';
import prisma from '@/db/db';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export const getProjectsHours = async () => {
  const user = await auth();

  if (!user || !user.user?.id) {
    return { error: 'User not authenticated' };
  }

  const response = await prisma.projectHours.findMany({
    include: {
      project: true,
    },
    where: {
      project: {
        client: {
            userId: user.user.id,
        }
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return response;
};

export const getProjectHoursById = async (id: string) => {
  const response = await prisma.projectHours.findUnique({
    where: {
      id: id,
    },
    include: {
      project: true,
    },
  });
  return response;
};

export const createProjectHours = async (
  values: z.infer<typeof CreateAddHoursProjectSchema>
) => {
  const validateFields = CreateAddHoursProjectSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: 'Invalid fields' };
  }

  const { projectId, hours, description, date, minutes } = values;

  const existingEntry = await prisma.projectHours.findFirst({
    where: {
      projectId,
      date,
    },
  });

  if (existingEntry) {
    return { error: 'Hours already logged for this date.' };
  }

  const existingProject = await prisma.project.findUnique({
    where: {
      uuid: projectId,
    },
  });

  const existingUser = await auth()

  const user = await prisma.user?.findUnique({
    where: {
      id: existingUser?.user?.id,
    },
    include: {
      subscriptions: true
    }
  })

  
  // Check client count based on subscription type
  const clientCount = await prisma.projectHours.count({
    where: { projectId: existingProject?.id},
  });

  if (user?.subscriptionType === 'TRIAL') {
    return { error: 'Please update to the Standard or enterprise plan to add clients.' };
  } else if (user?.subscriptionType === 'STANDARD' && clientCount >= 100) {
    return { error: 'Standard plan allows only up to 100 clients.' };
  }

  await prisma.projectHours.create({
    data: {
      projectId: existingProject?.id,
      name: existingProject?.name,
      hours,
      description,
      date,
      minutes
    },
  });

  revalidatePath('/projects/add-hours');
  return { success: 'Hours logged successfully.' };
};

export const updateProjectHours = async (
  values: z.infer<typeof CreateAddHoursProjectSchema>
) => {
  const validateFields = CreateAddHoursProjectSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: 'Invalid fields' };
  }

  const { uuid, projectId, hours, description, date, minutes } = values;

  const existingProject = await prisma.project.findUnique({
    where: {
      uuid: projectId,
    },
  });

  await prisma.projectHours.update({
    where: {
      uuid: uuid,
    },
    data: {
      projectId: existingProject?.id,
      name: existingProject?.name,
      hours,
      description,
      date,
      minutes
    },
  });

  revalidatePath('/projects/add-hours');
  return { success: 'Hours updated successfully.' };
};

export const deleteProjectHours = async (id: string) => {
  await prisma.projectHours.delete({
    where: {
      uuid: id,
    },
  });
  revalidatePath('/projects/add-hours');
  return { success: 'Project Hours deleted successfully' };
};



export const getProjectHoursByProjectId = async (id: string) => {
    const project = await prisma.project.findUnique({
      where: {
        uuid: id,
      },
      include: {
        address: true,
      },
    });
  
    const hours = await prisma.projectHours.findMany({
      where: {
        projectId: project?.id,
      },
      include: {
        project: true,
      },
      orderBy: {
        createdAt: "desc"
      }
    });
    return hours;
  };