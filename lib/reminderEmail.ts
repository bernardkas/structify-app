import { Resend } from 'resend'; // Import your email provider
import { format } from 'date-fns';
import prisma from '@/db/db';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendReminderEmails = async () => {
  console.log('is it working');
  const now = new Date();
  const dayOfWeek = format(now, 'EEEE').toLowerCase();
  const currentTime = format(now, 'HH:mm'); 
  const dayOfMonth = now.getDate().toString(); 


const weeklyReminders = await prisma.remainder.findMany({
  where: {
    status: 'ACTIVE',
    frequency: 'weekly',
    daysOfWeek: {
      has: dayOfWeek,
    },
    reminderTime: currentTime,
    startDate: {
      lte: now, 
    },
  },
  include: {
    client: true,
  },
});

// Query monthly reminders
const monthlyReminders = await prisma.remainder.findMany({
  where: {
    status: 'ACTIVE',
    frequency: 'monthly',
    daysOfMonth: {
      has: dayOfMonth, 
    },
    reminderTime: currentTime,
    startDate: {
      lte: now, 
    },
  },
  include: {
    client: true,
  },
});

// Merge the results
const reminders = [...weeklyReminders, ...monthlyReminders];



  for (const reminder of reminders) {
    const { emailRecipient, reminderMessage, client } = reminder;

    try {
      await resend.emails.send({
        from: 'noreply@app.structifyapp.com',
        to: emailRecipient,
        subject: `Reminder from ${client.name}`,
        // @ts-ignore
        html: reminderMessage,
      });

    } catch (error) {
      console.error(`Failed to send email to ${emailRecipient}: `, error);
    }
  }
};
