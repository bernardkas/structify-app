'use server'


import { auth } from '@/auth';
import { CreateClientSchema } from '@/components/clients/validation';
import prisma from '@/db/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export const getClients = async () => {
    const clients = await prisma.client.findMany({
        include: {
          address: true
        }
      });
    
      // Remove 'id' from each client object
      const sanitizedClients = clients.map(({ id, ...client }) => client);
      return sanitizedClients;
}

export const getClientById = async (id: any) => {
  console.log('slug', id)
  const uuid = id.slug
  const client = await prisma.client.findFirst({
    where: {
      uuid: uuid,
    },
      include: {
        address: true
      }
    });

    if (client?.uuid !== uuid) {
      return redirect(`/clients`);
    }
    return client;
}

export const createClient = async (
  values: z.infer<typeof CreateClientSchema>
) => {
  const validateFields = CreateClientSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: 'Invalid fields' };
  }

  const existingUser = await auth();

  if (!existingUser) {
    return { error: 'User not found' };
  }

  const {
    name,
    organization,
    color,
    phone,
    email,
    status,
    date,
    address: { street, city, state, zip, country },
  } = values;

  
  const generateClientId = () => {
    const randomNumber = Math.floor(10000 + Math.random() * 90000); 
    return `P${randomNumber}`;
  };
  
  const clientId = generateClientId();

  const client = await prisma.client.create({
    data: {
      name,
      organization,
      color,
      phone,
      email,
      status,
      clientId,
      date,
      address: {
        create: {
          street,
          city,
          state,
          zip,
          country,
        },
      },
      user: {
        connect: {
          id: existingUser.user?.id,
        },
      },
    },
  });
  
  redirect(`/clients/${client.uuid}/detail`);
};

export const updateClient = async (
  values: z.infer<typeof CreateClientSchema>
) => {
  const validateFields = CreateClientSchema.safeParse(values);
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
    organization,
    color,
    phone,
    email,
    status,
    date,
    address: { street, city, state, zip, country },
  } = values;

  const clientExists = await prisma.client.findUnique({
    where: { uuid },
  });

  if (!clientExists) {
    return { error: 'Client not found' };
  }

  await prisma.client.update({
    where: { uuid },
    data: {
      name,
      organization,
      color,
      phone,
      email,
      status,
      date,
      address: {
        update: {
          street,
          city,
          state,
          zip,
          country,
        },
      },
      user: {
        connect: {
          id: existingUser.user?.id, 
        },
      },
    },
  });

  revalidatePath(`/clients/${uuid}/detail`);
  return { success: 'Client updated successfully' };
};


export const deleteClient = async (uuid: string) => {
  await prisma.client.delete({
    where: {
      uuid: uuid 
    },
  });

  return {success: "Successfully deleted"}
}


export const archiveClient = async (uuid: string) => {
  await prisma.client.update({
    where: {
      uuid: uuid,
    },
    data: {
      deletedAt: new Date(),  
    },
  });

  return {success: "Successfully archived"}
}
  

