import { sendReminderEmails } from '@/lib/reminderEmail';
import { NextRequest, NextResponse } from 'next/server';
const cron = require('node-cron');


export async function POST()  {
  cron.schedule('* * * * *', () => {
    console.log('running cron')
    sendReminderEmails();
  });
  return NextResponse.json({ message: 'Reminder emails sent successfully' });
};