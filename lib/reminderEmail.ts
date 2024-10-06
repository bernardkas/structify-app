import { Resend } from 'resend'; // Import your email provider
import { format } from 'date-fns';
import prisma from '@/db/db';

const resend = new Resend(process.env.RESEND_API_WEBHOOK);

export const sendReminderEmails = async () => {
  const now = new Date();
  const dayOfWeek = format(now, 'EEEE').toLowerCase();
  const currentTime = format(now, 'HH:mm'); 

  const reminders = await prisma.remainder.findMany({
    where: {
      status: 'ACTIVE', 
      frequency: 'weekly',
      daysOfWeek: {
        has: dayOfWeek, 
      },
      reminderTime: currentTime, 
    },
    include: {
      client: true,
    },
  });

  console.log('Fetched reminders:', reminders);

  for (const reminder of reminders) {
    const { emailRecipient, reminderMessage, client } = reminder;

    try {
      await resend.emails.send({
        from: 'noreply@yourapp.com',
        to: emailRecipient,
        subject: `Reminder from ${client.name}`,
        text: reminderMessage,
      });

      console.log(`Reminder sent to ${emailRecipient}`);  
    } catch (error) {
      console.error(`Failed to send email to ${emailRecipient}: `, error);
    }
  }
};
