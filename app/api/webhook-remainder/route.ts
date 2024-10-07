import { sendReminderEmails } from '@/lib/reminderEmail';
import { NextRequest, NextResponse } from 'next/server';
import cron from 'node-cron';
import { Resend } from 'resend';

export async function GET()  {
  await sendReminderEmails();
  return NextResponse.json({ message: 'Reminder emails sent successfully' });

};