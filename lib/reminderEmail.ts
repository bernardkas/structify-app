import { Resend } from 'resend';
import { toDate, format, toZonedTime } from 'date-fns-tz';
import { addMinutes, subMinutes } from 'date-fns';
import prisma from '@/db/db';

const resend = new Resend(process.env.RESEND_API_KEY);

const timeZone = process.env.CUSTOM_TIMEZONE || 'UTC';


export const sendReminderEmails = async () => {
  const now = new Date();
  console.log("Current UTC Time:", now.toISOString());

  const zonedDate = toZonedTime(now, timeZone);
  console.log("Zoned Date:", zonedDate);
  console.log("Server default timezone:", Intl.DateTimeFormat().resolvedOptions().timeZone);

  // Calculate time window (±1 minute)
  const startTime = format(subMinutes(zonedDate, 1), 'HH:mm'); // 1 minute before
  const endTime = format(addMinutes(zonedDate, 1), 'HH:mm');   // 1 minute after
  const dayOfWeek = format(zonedDate, 'EEEE').toLowerCase();
  const dayOfMonth = zonedDate.getDate().toString();

  const weeklyReminders = await prisma.remainder.findMany({
    where: {
      status: 'ACTIVE',
      frequency: 'weekly',
      daysOfWeek: { has: dayOfWeek },
      reminderTime: {
        gte: startTime,
        lte: endTime, // Match within time window
      },
      startDate: { lte: zonedDate },
    },
    include: { client: true },
  });

  const monthlyReminders = await prisma.remainder.findMany({
    where: {
      status: 'ACTIVE',
      frequency: 'monthly',
      daysOfMonth: { has: dayOfMonth },
      reminderTime: {
        gte: startTime,
        lte: endTime, // Match within time window
      },
      startDate: { lte: zonedDate },
    },
    include: { client: true },
  });

  const reminders = [...weeklyReminders, ...monthlyReminders];
  const uniqueReminders = Array.from(new Map(reminders.map(r => [r.id, r])).values());

  console.log('Unique reminders to send:', uniqueReminders);


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
      console.log('Email sent successfully to:', emailRecipient);
    } catch (error) {
      console.error(`Failed to send email to ${emailRecipient}:`, error);
    }
  }
};
