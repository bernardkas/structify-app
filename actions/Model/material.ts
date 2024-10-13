'use server';
import { CreateMaterialSchema } from '@/components/projects/subpages/materials/validation';
import prisma from '@/db/db';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export const getMaterials = async (projectId: string) => {
  const project = await prisma.project.findUnique({
    where: {
      uuid: projectId,
    },
  });
  const resposne = await prisma.material.findMany({
    where: {
      projectId: project?.id,
    },
    include: {
      materialInfo: true,
    },
  });

  return resposne;
};

export const createMaterial = async (
  values: z.infer<typeof CreateMaterialSchema>
) => {
  const validateFields = CreateMaterialSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: 'Invalid fields' };
  }

  const { name, description, status, supplier, date, projectId, materialInfo } =
    values;

  await prisma.material.create({
    data: {
      name,
      description,
      status,
      supplier,
      date,
      project: {
        connect: {
          uuid: projectId,
        },
      },
      materialInfo: {
        create: materialInfo,
      },
    },
  });

  revalidatePath(`/projects/${projectId}/materials`);
  return { success: 'Material created successfully' };
};

export const updateMaterial = async (
  values: z.infer<typeof CreateMaterialSchema>
) => {
  const validateFields = CreateMaterialSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: 'Invalid fields' };
  }

  const {
    uuid,
    name,
    description,
    status,
    supplier,
    date,
    projectId,
    materialInfo,
  } = values;

  const existingMaterial = await prisma.material.findUnique({
    where: { uuid },
    include: { materialInfo: true },
  });

  if (!existingMaterial) {
    return { error: 'Material not found' };
  }

  const existingMaterialInfoIds = existingMaterial.materialInfo.map(
    info => info.uuid
  );

  const updatedMaterialInfoIds = materialInfo
    .map(info => info.uuid)
    .filter(Boolean);
  const removedMaterialInfoIds = existingMaterialInfoIds.filter(
    id => !updatedMaterialInfoIds.includes(id)
  );

  await prisma.materialInfo.deleteMany({
    where: {
      uuid: { in: removedMaterialInfoIds },
    },
  });

  await prisma.material.update({
    where: {
      uuid: uuid,
    },
    data: {
      name,
      description,
      status,
      supplier,
      date,
      project: {
        connect: {
          uuid: projectId,
        },
      },
      materialInfo: {
        upsert: materialInfo.map((info) => ({
          where: { uuid: info.uuid || '' },
          create: {
            name: info.name,
            price: info.price,
          },
          update: {
            name: info.name,
            price: info.price,
          },
        })),
      },
    },
  });

  revalidatePath(`/projects/${projectId}/materials`);
  return { success: 'Material updated successfully' };
};

export const deleteMaterial = async (uuid: string) => {
  await prisma.material.delete({
    where: {
      uuid: uuid,
    },
  });

  revalidatePath(`/projects/${uuid}/materials`);
  return { success: 'Successfully deleted' };
};
