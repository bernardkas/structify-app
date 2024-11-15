import prisma from '@/db/db';
import { Resend } from 'resend';

export async function checkTrialExpiry() {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const usersWithEndingTrials = await prisma.user.findMany({
    where: {
      subscriptions: {
        some: {
          status: 'active',
          isTrialActive: true,
          trialEndDate: tomorrow,
        },
      },
    },
    include: { subscriptions: true },
  });

  // Loop through each user and send reminder emails
  for (const user of usersWithEndingTrials) {
    try {
      await resend.emails.send({
        from: 'noreply@structifyapp.com',
        to: user?.email,
        subject: 'Your Free Trial Ends Tomorrow!',
        // @ts-ignore
        html: `
            Hi ${user.name},
        
            We hope you've enjoyed using our services during your free trial. This is a friendly reminder that your trial period will end tomorrow, and your subscription will automatically renew on ${tomorrow.toLocaleDateString()}.
        
            **What to Expect:**
            - **Automatic Renewal**: If you take no action, your subscription will automatically renew, and your payment method on file will be charged.
            - **Manage Your Subscription**: If you would like to review your subscription or update your payment information, please visit your account settings.
        
            If you have any questions or need assistance, our support team is here to help. Simply reach out through our support page.
        
            Thank you for choosing us! We're excited to continue supporting you.
        
            Best regards,  
            Structify Team
          `,
      });

      console.log(`Reminder email sent to ${user.email}`);
    } catch (error) {
      console.error(`Failed to send email to ${user.email}:`, error);
    }
  }
}
