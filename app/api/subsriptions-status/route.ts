// /pages/api/subscription-status.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/db/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  try {
    const subscription = await prisma.subscription.findFirst({
      where: { userId },
      select: { type: true },
    });

    if (subscription) {
      res.status(200).json({ subscriptionType: subscription.type });
    } else {
      res.status(200).json({ subscriptionType: 'Basic' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching subscription status' });
  }
}
