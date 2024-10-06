'use server';
import { sendReminderEmails } from '@/lib/reminderEmail';
import { NextRequest, NextResponse } from 'next/server';
import cron from 'node-cron';


export async function POST(request: NextRequest) {
    cron.schedule('* * * * *', () => {
        console.log('Checking for reminders to send...');
        sendReminderEmails(); 
      });

    return NextResponse.json({ success: true });
  }
