'use server';
import { InvoiceTypeSchema } from '@/components/template-invoice/invoice-type';
import prisma from '@/db/db';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

export const createInvocie = async (
  values: z.infer<typeof InvoiceTypeSchema>
) => {
  const validetedFields = InvoiceTypeSchema.safeParse(values);

  if (!validetedFields.success) {
    return { error: 'Invalid fields' };
  }

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
  const clientCount = await prisma.invoice.count({
    where: { userId: existingUser?.user?.id },
  });

  if (user?.subscriptionType === 'TRIAL') {
    return { error: 'Please update to the Standard or enterprise plan to add clients.' };
  } else if (user?.subscriptionType === 'STANDARD' && clientCount >= 100) {
    return { error: 'Standard plan allows only up to 100 clients.' };
  }

  const {
    name,
    invoiceNumber,
    companyName,
    address,
    city,
    postCode,
    companyPhone,
    email,
    companyLogo,
    date,
    richText,

    clientName,
    clientCompanyName,
    clientAddress,
    clientPhone,
    clientEmail,


    subtotal,
    taxRate,
    totalTax,
    fullPrice,

    descriptions,
  } = values;

  const response = await prisma.invoice.create({
    data: {
      userId: existingUser?.user?.id,
      name,
      invoiceNumber,
      companyName,
      address,
      city,
      postCode,
      companyPhone,
      email,
      companyLogo,
      date,
      richText,
      clientCompanyName,
      clientPhone,
      clientEmail,
      clientName,
      clientAddress,
      descriptions: {
        create: descriptions.map(description => ({
          description: description.description,
          quantity: description.quantity,
          unitPrice: description.unitPrice,
          totalPrice: description.totalPrice,
        })),
      },
      subtotal,
      taxRate,
      totalTax,
      fullPrice,
    },
  });

  if (response) {
    return redirect(`/invoice/detail/${response.id}`);
  }
  return { success: 'Invoice created successfully' };
};

export const updateInvocie = async (
  values: z.infer<typeof InvoiceTypeSchema>
) => {
  const validetedFields = InvoiceTypeSchema.safeParse(values);

  if (!validetedFields.success) {
    return { error: 'Invalid fields' };
  }

  const {
    invoiceId,
    name,
    invoiceNumber,
    companyName,
    address,
    city,
    postCode,
    companyPhone,
    email,
    companyLogo,
    date,
    richText,

    clientName,
    clientCompanyName,
    clientAddress,
    clientPhone,
    clientEmail,

    subtotal,
    taxRate,
    totalTax,
    fullPrice,

    descriptions,
  } = values;

  const existingDescriptions = await prisma.invoiceDescription.findMany({
    where: { invoiceId },
    select: { id: true },
  });

  // Get the IDs of descriptions from the incoming data
  const updatedDescriptionIds = descriptions
    .map(description => description.id)
    .filter(Boolean);

  const descriptionsToDelete = existingDescriptions
    .filter(description => !updatedDescriptionIds.includes(description.id))
    .map(description => description.id);

  if (descriptionsToDelete.length > 0) {
    await prisma.invoiceDescription.deleteMany({
      where: {
        id: { in: descriptionsToDelete },
      },
    });
  }

  const descriptionsWithId = descriptions.filter(description => description.id);
  const descriptionsWithoutId = descriptions.filter(
    description => !description.id
  );

  await prisma.invoice.update({
    where: {
      id: invoiceId,
    },
    data: {
      name,
      invoiceNumber,
      companyName,
      address,
      city,
      postCode,
      companyPhone,
      email,
      companyLogo,
      date,
      richText,
      clientCompanyName,
      clientPhone,
      clientEmail,
      clientName,
      clientAddress,
      descriptions: {
        upsert: descriptionsWithId.map(description => ({
          where: { id: description.id },
          create: {
            description: description.description,
            quantity: description.quantity,
            unitPrice: description.unitPrice,
            totalPrice: description.totalPrice,
          },
          update: {
            description: description.description,
            quantity: description.quantity,
            unitPrice: description.unitPrice,
            totalPrice: description.totalPrice,
          },
        })),
        createMany: {
          data: descriptionsWithoutId.map(description => ({
            description: description.description,
            quantity: description.quantity,
            unitPrice: description.unitPrice,
            totalPrice: description.totalPrice,
          })),
        },
      },
      subtotal,
      taxRate,
      totalTax,
      fullPrice,
    },
  });

  revalidatePath(`/invoice/${invoiceId}`);

  return { success: 'Invoice updated successfully' };
};

export const deleteInvocieById = async (invoiceId: string) => {
  await prisma.invoice.delete({
    where: {
      id: invoiceId,
    },
  });

  revalidatePath(`/invoice`);
  return { success: 'Invoice deleted successfully' };
};

export const getInvocieById = async (params: any) => {
  const { slug } = params.params;
  if (!slug) {
    return { error: 'Invoice id is required' };
  }
  const invoice = await prisma.invoice.findUnique({
    where: {
      id: slug,
    },
    include: {
      descriptions: true,
    },
  });

  if (invoice?.id !== slug) {
    return redirect('/invoice');
  }
  return invoice;
};

export const getInvoices = async () => {
  return await prisma.invoice.findMany({
    include: {
      descriptions: true,
    },
    orderBy: {
      createdAt: 'desc',
    }
  });
};
