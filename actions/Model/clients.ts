'use server'


import { auth } from '@/auth';
import { CreateClientSchema } from '@/components/clients/validation';
import prisma from '@/db/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export const getClients = async () => {
  const user = await auth()
  if (!user) {
    return { error: 'User not found' }
  }

    const clients = await prisma.client.findMany({
      where: {
        userId: user.user?.id
      },
        include: {
          address: true
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      const sanitizedClients = clients.map(({ id, ...client }) => client);
      return sanitizedClients;
}

export const getClientById = async (id: any) => {
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

  const user = await prisma.user?.findUnique({
    where: {
      id: existingUser.user?.id,
    },
    include: {
      subscriptions: true
    }
  })

  
  // Check client count based on subscription type
  const clientCount = await prisma.client.count({
    where: { userId: existingUser.user?.id },
  });

  if (user?.subscriptionType === 'TRIAL') {
    return { error: 'Please update to the Standard or enterprise plan to add clients.' };
  } else if (user?.subscriptionType === 'STANDARD' && clientCount >= 100) {
    return { error: 'Standard plan allows only up to 100 clients.' };
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
    address: { id, street, city, state, zip, country },
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

  revalidatePath(`/clients`);
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
  


export const getProjectByClientId = async (clientId: string) => {
  const client = await prisma.client.findUnique({
    where: {
      uuid: clientId, 
    },
    select: {
      id: true, 
    },
  });

  if (!client) {
    return redirect(`/clients`);
  }


  const projects = await prisma.project.findMany({
    where: {
      clientId: client.id, 
    },
    include: {
      address: true,
    },
  });

    return projects;
}
