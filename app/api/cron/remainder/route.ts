import { sendReminderEmails } from '@/lib/reminderEmail';
import { NextRequest, NextResponse } from 'next/server';


export async function GET()  {
  console.log('running cron')
  await sendReminderEmails();
  return NextResponse.json({ message: 'Reminder emails sent successfully' });

};