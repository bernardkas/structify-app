import { Resend } from 'resend'; // Import your email provider
import { format } from 'date-fns';
import prisma from '@/db/db';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendReminderEmails = async () => {
  const now = new Date();
  const dayOfWeek = format(now, 'EEEE').toLowerCase();
  const currentTime = format(now, 'HH:mm'); 
  const dayOfMonth = now.getDate().toString(); 

  const reminders = await prisma.remainder.findMany({
    where: {
      status: 'ACTIVE',
      OR: [
        {
          frequency: 'weekly',
          daysOfWeek: {
            has: dayOfWeek,
          },
        },
        {
          frequency: 'monthly',
          daysOfMonth: {
            has: dayOfMonth,
          },
        },
      ],
      reminderTime: currentTime,
    },
    include: {
      client: true,
    },
  });

  for (const reminder of reminders) {
    const { emailRecipient, reminderMessage, client } = reminder;

    try {
      await resend.emails.send({
        from: 'noreply@structifyapp.com',
        to: emailRecipient,
        subject: `Reminder from ${client.name}`,
        // @ts-ignore
        text: reminderMessage,
      });

      console.log(`Reminder sent to ${emailRecipient}`);  
    } catch (error) {
      console.error(`Failed to send email to ${emailRecipient}: `, error);
    }
  }
};
