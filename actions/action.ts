'use server';
import prisma from '@/db/db';

import { CreatePostSchema } from '@/schemas';
import { z } from 'zod';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';

// This is just an example how you can create a Post
export const createForm = async (values: z.infer<typeof CreatePostSchema>) => {
  const validetedFields = CreatePostSchema.safeParse(values);

  if (!validetedFields.success) {
    return { error: 'Invalid fields' };
  }

  const existingUser = await auth();

  if (!existingUser) {
    return { error: 'Ther is no user' };
  }

  console.log('values server', values);

  const { name, lastName, email, phone, title, description, isPaid, photo } =
    values;

  await prisma.nameTable.create({
    data: {
      name,
      user: {
        connect: {
          id: existingUser?.user?.id,
        },
      },
      lastname: lastName,
      email,
      phone,
      title,
      description,
      isPaid,
      photo,
    },
  });

  revalidatePath('/');

  return { success: 'Created successful' };
};

// This is just an example how you can retriv a post
export const getPost = async () => {
  return await prisma.nameTable.findMany();
};
