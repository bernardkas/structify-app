'use server';
import { CreateBudgetCostSchema } from '@/components/projects/subpages/budget-cost-tracking/validation';
import prisma from '@/db/db';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export const getBudgetAndCosts = async (projectId: string) => {
  const project = await prisma.project.findUnique({
    where: {
      uuid: projectId,
    },
  });

  const budgetAndCosts = await prisma.projectBudget.findMany({
    where: {
      projectId: project?.id,
    },
    include: {
      estimatedCosts: true,
    },
  });

  return budgetAndCosts;
};


export const createBudgetAndCost = async (
  values: z.infer<typeof CreateBudgetCostSchema>
) => {
  const validateFields = CreateBudgetCostSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: 'Invalid fields' };
  }

  const {
    totalBudget,
    projectId,
    name,
    costsIncurred,
    costOverruns,
    estimatedCosts,
  } = values;
  const project = await prisma.project.findUnique({
    where: { uuid: projectId },
  });

  if (!project) {
    return { error: 'Project not found' };
  }

  await prisma.projectBudget.create({
    data: {
      name,
      totalBudget,
      costsIncurred,
      costOverruns,
      estimatedCosts: {
        create: estimatedCosts,
      },
      project: {
        connect: {
          uuid: projectId,
        },
      },
    },
  });

  revalidatePath(`/projects/${projectId}/budget-cost-tracking`);
  return { success: 'Budget and cost created successfully' };
};

export const updateBudgetAndCost = async (
  values: z.infer<typeof CreateBudgetCostSchema>
) => {
  const validateFields = CreateBudgetCostSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: 'Invalid fields' };
  }

  const {
    uuid,
    name,
    totalBudget,
    projectId,
    costsIncurred,
    costOverruns,
    estimatedCosts,
  } = values;

  const project = await prisma.project.findUnique({
    where: { uuid: projectId },
  });

  if (!project) {
    return { error: 'Project not found' };
  }

  await prisma.projectBudget.update({
    where: {
      uuid: uuid,
    },
    data: {
      name,
      totalBudget,
      costsIncurred,
      costOverruns,
      estimatedCosts: {
        upsert: estimatedCosts.map((cost) => ({
          where: { uuid: cost.uuid || '' }, // Ensure cost.uuid is valid
          create: { type: cost.type, amount: cost.amount },
          update: { type: cost.type, amount: cost.amount },
        })),
      },
      project: {
        connect: {
          uuid: projectId,
        },
      },
    },
  });

  revalidatePath(`/projects/${projectId}/budget-cost-tracking`);
  return { success: 'Budget updated successfully' };
};

export const deleteBudgetAndCost = async (uuid: string) => {
  await prisma.projectBudget.delete({
    where: {
      uuid: uuid,
    },
  });

  revalidatePath(`/projects/${uuid}/budget-cost-tracking`);
  return { success: 'Successfully deleted' };
};
