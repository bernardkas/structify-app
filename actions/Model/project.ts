'use server';

import { auth } from '@/auth';
import { CreateClientSchema } from '@/components/clients/validation';
import { CreateProjectSchema } from '@/components/projects/validation';
import prisma from '@/db/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export const getProjects = async () => {
  const user = await auth()
  if (!user) {
    return { error: 'User not found' }
  }

  const projects = await prisma.project.findMany({
      where: {
        client: {
          userId: user.user?.id
        }
      },
    include: {
      address: true,
      client: true,
    },
  });

  const sanitizedClients = projects.map(({ id, ...project }) => project);
  return sanitizedClients;
};

export const getClientById = async (id: any) => {
  const uuid = id.slug;
  const project = await prisma.project.findFirst({
    where: {
      uuid: uuid,
    },
    include: {
      address: true,
      client: true,
    },
  });

  if (project?.uuid !== uuid) {
    return redirect(`/projects`);
  }
  return project;
};

export const createProject = async (
  values: z.infer<typeof CreateProjectSchema>
) => {
  const validateFields = CreateProjectSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: 'Invalid fields' };
  }

  const existingUser = await auth();

  if (!existingUser) {
    return { error: 'User not found' };
  }

  const {
    name,
    description,
    color,
    projectType,
    projectStatus,
    startDate,
    clientId,
    address: { street, city, state, zip, country },
  } = values;

  const generateProjecttId = () => {
    const randomNumber = Math.floor(10000 + Math.random() * 90000);
    return `P${randomNumber}`;
  };

  const projectId = generateProjecttId();

  const client = await prisma.client.findUnique({
    where: { uuid: clientId },
  });

  if (!client) {
    return { error: 'Client not found' };
  }

  const project = await prisma.project.create({
    data: {
      name,
      description,
      color,
      projectStatus,
      projectId,
      projectType,
      client: {
        connect: {
          uuid: clientId,
        },
      },
      startDate,
      address: {
        create: {
          street,
          city,
          state,
          zip,
          country,
        },
      },
    },
  });

  redirect(`/projects/${project.uuid}/detail`);
};

export const updateProject = async (
  values: z.infer<typeof CreateProjectSchema>
) => {
  const validateFields = CreateProjectSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: 'Invalid fields' };
  }

  const {
    uuid,
    name,
    description,
    color,
    projectType,
    projectStatus,
    startDate,
    clientId,
    address: { street, city, state, zip, country },
  } = values;

  const client = await prisma.client.findUnique({
    where: { uuid: clientId },
  });

  if (!client) {
    return { error: 'Client not found' };
  }

  const projectExists = await prisma.project.findUnique({
    where: { uuid },
  });

  if (!projectExists) {
    return { error: 'Client not found' };
  }

  await prisma.project.update({
    where: { uuid },
    data: {
      name,
      description,
      color,
      projectStatus,
      projectType,
      client: {
        connect: {
          uuid: clientId,
        },
      },
      startDate,
      address: {
        create: {
          street,
          city,
          state,
          zip,
          country,
        },
      },
    },
  });

  revalidatePath(`/projects/${uuid}/detail`);
  return { success: 'Projects updated successfully' };
};

export const deleteProject = async (uuid: string) => {
  await prisma.project.delete({
    where: {
      uuid: uuid,
    },
  });

  revalidatePath(`/projects`);
  return { success: 'Successfully deleted' };
};

export const archiveProject = async (uuid: string) => {
  await prisma.project.update({
    where: {
      uuid: uuid,
    },
    data: {
      deletedAt: new Date(),
    },
  });

  return { success: 'Successfully archived' };
};
