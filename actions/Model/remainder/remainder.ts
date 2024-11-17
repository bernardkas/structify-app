'use server'

import { auth } from '@/auth';
import { CreateRemainderSchema } from '@/components/clients/subpages/remainder/validation';
import prisma from '@/db/db';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export const getRemainders = async (clientId: string) => {

  const existingClient = await prisma.client.findMany({
    where: {
      uuid: clientId
    },
  })
  const remainders = await prisma.remainder.findMany({
    where: {
      clientId: existingClient[0].id
    },
    include: {
      client: true,
    },
    orderBy: {
      createdAt: 'desc'
    }

  });

  return remainders


};

export const createRemainder = async (
  values: z.infer<typeof CreateRemainderSchema>
) => {
  const validateFields = CreateRemainderSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: 'Invalid fields' };
  }

  const existingUser = await auth();

  if (!existingUser) {
    return { error: 'User not found' };
  }

  const {
    name,
    clientId,
    startDate,
    frequency,
    daysOfWeek,
    daysOfMonth,
    reminderTime,
    emailRecipient,
    reminderMessage,
    status,
  } = values;



  await prisma.remainder.create({
    data: {
      name,
      startDate,
      frequency,
      daysOfWeek,
      daysOfMonth,
      reminderTime,
      emailRecipient,
      reminderMessage,
      status,
      client: {
        connect: {
          uuid: clientId,
        },
      },
    },
  });

  revalidatePath(`/clients/${clientId}/remainder`);

  return {success: "Remainder created successfully"}
};


export const updateRemainder = async (
  values: z.infer<typeof CreateRemainderSchema>
) => {
  const validateFields = CreateRemainderSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: 'Invalid fields' };
  }

  const existingUser = await auth();

  if (!existingUser) {
    return { error: 'User not found' };
  }

  const {
    uuid,
    name,
    clientId,
    startDate,
    frequency,
    daysOfWeek,
    daysOfMonth,
    reminderTime,
    emailRecipient,
    reminderMessage,
    status,
  } = values;


  await prisma.remainder.update({
    where: { uuid },
    data: {
      name,
      startDate,
      frequency,
      daysOfWeek,
      daysOfMonth,
      reminderTime,
      emailRecipient,
      reminderMessage,
      status,
    },
  });

  revalidatePath(`/clients/${clientId}/remainder`);

  return {success: "Remainder updated successfully"}
};

export const deleteRemainder = async (uuid: string) => {
    await prisma.remainder.delete({
      where: {
        uuid: uuid 
      },
    });
    revalidatePath(`/clients/${uuid}/remainder`);
    return {success: "Successfully deleted"}
  }