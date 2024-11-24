import { Resend } from 'resend';
import { toDate, format, toZonedTime } from 'date-fns-tz';
import prisma from '@/db/db';

const resend = new Resend(process.env.RESEND_API_KEY);

const timeZone = process.env.CUSTOM_TIMEZONE || 'UTC';


export const sendReminderEmails = async () => {
  const now = new Date();

  const zonedDate = toZonedTime(now, timeZone);
  const dayOfWeek = format(zonedDate, 'EEEE').toLowerCase();
  const dayOfMonth = zonedDate.getDate().toString();
  const currentTime = format(zonedDate, 'HH:mm');

  const weeklyReminders = await prisma.remainder.findMany({
    where: {
      status: 'ACTIVE',
      frequency: 'weekly',
      daysOfWeek: { has: dayOfWeek },
      // @ts-ignore
      reminderTime: currentTime,
      startDate: { lte: zonedDate },
    },
    include: { client: true },
  });

  const monthlyReminders = await prisma.remainder.findMany({
    where: {
      status: 'ACTIVE',
      frequency: 'monthly',
      daysOfMonth: { has: dayOfMonth },
      // @ts-ignore
      reminderTime: currentTime,
      startDate: { lte: zonedDate },
    },
    include: { client: true },
  });

  const reminders = [...weeklyReminders, ...monthlyReminders];
  const uniqueReminders = Array.from(new Map(reminders.map(r => [r.id, r])).values());



  for (const reminder of uniqueReminders) {
    // @ts-ignore
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
      console.error(`Failed to send email to ${emailRecipient}:`, error);
    }
  }
};
