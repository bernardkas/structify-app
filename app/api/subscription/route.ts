import prisma from "@/db/db";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-10-28' as Stripe.LatestApiVersion
  });


  export default async function handler(req: NextApiRequest, res: NextApiResponse) { 
    if (req.method === 'POST') {
      try {
        const { userId, priceId } = req.body;
  
        const user = await prisma.user.findUnique({ where: { id: userId } }); 
  
        if (!user || !user.stripeId) {
          return res.status(400).json({ error: 'User not found or missing Stripe ID.' });
        }
  
        // Create a checkout session
        const session = await stripe.checkout.sessions.create({
          customer: user.stripeId,
          line_items: [{ price: priceId, quantity: 1 }],
          mode: 'subscription',
          success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/subscription/success`,
          cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/subscription/cancel`,
        });
  
        res.status(200).json({ url: session.url });
      } catch (error) {
        res.status(400).json({ error: 'Unable to create subscription' });
      }
    } else {
      res.setHeader('Allow', 'POST');
      res.status(405).end('Method Not Allowed');
    }
  }
  
  