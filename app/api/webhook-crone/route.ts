import { sendReminderEmails } from '@/lib/reminderEmail';
import cron from 'node-cron';

cron.schedule('* * * * *', () => {
  console.log('Checking for reminders to send...');
  sendReminderEmails(); 
});
