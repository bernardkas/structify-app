import { headers } from 'next/headers';
import Stripe from 'stripe';
import { price } from './../../../../components/price/Subscription';
import prisma from '@/db/db';
import { SubscriptionType } from '@prisma/client';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);
const webhhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();

  const signature = headers().get('stripe-signature')!;

  let data;
  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhhookSecret);
  } catch (err) {
    console.log(`⚠️  Webhook signature verification failed.`);
    return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
  }

  data = event.data as any;

  async function getCustomerEmail(customerId: string): Promise<string | null> {
    try {
      const customer = await stripe.customers.retrieve(customerId);
      return (customer as Stripe.Customer).email;
    } catch (err) {
      console.error('Error fetching customer:', err);

      return null;
    }
  }
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        try {
          const session = await stripe.checkout.sessions.retrieve(
            data.object.id,
            { expand: ['line_items'] }
          );

          const customerId = session?.customer as any;
          const customer = await getCustomerEmail(customerId);

          let priceId: string | undefined;
          if (session?.line_items?.data?.[0]?.price?.id) {
            priceId = session.line_items.data[0].price.id;
          } else {
            console.log('No price ID found in session.');
            break;
          }

          if (customer) {
            const userEmail = customer as string;
            // Find the user by email
            const user = await prisma.user.findUnique({
              where: { email: userEmail },
            });
            if (!user) {
              console.log(`User not found with email: ${userEmail}`);
              break;
            }

            let subscriptionType: SubscriptionType;
            if (priceId === 'price_1QH7jmGSj97UGaVByVJGDj7F') {
              subscriptionType = SubscriptionType.STANDARD;
            } else if (priceId === 'price_1QH7kpGSj97UGaVBbhsehBCi') {
              subscriptionType = SubscriptionType.ENTERPRISE;
            } else {
              console.log('Unknown price ID, no subscription type matched.');
              break;
            }

            // Find or create the subscription
            const existingSubscription = await prisma.subscription.findFirst({
              where: { userId: user.id, status: 'active' },
            });

            if (existingSubscription) {
              await prisma.subscription.update({
                where: { id: existingSubscription.id },
                data: {
                  type: subscriptionType,
                  status: 'active',
                  priceId: priceId,
                  updatedAt: new Date(),
                },
              });
            } else {
              await prisma.subscription.create({
                data: {
                  userId: user.id,
                  stripeSubscriptionId: data.object.id,
                  status: 'active',
                  priceId: priceId,
                  type: subscriptionType,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                },
              });
            }
          }
        } catch (err) {
          console.error('Error handling checkout.session.completed:', err);
        }

        break;
      }
      case 'customer.subscription.updated': {
      }

      case 'customer.subscription.deleted': {
        const subscription = await stripe.subscriptions.retrieve(
          data.object.id
        );

        // Find the subscription in the database
        const existingSubscription = await prisma.subscription.findUnique({
          where: { stripeSubscriptionId: subscription.id },
        });

        if (existingSubscription) {
          // Delete the subscription from the database
          await prisma.subscription.update({
            where: { id: existingSubscription.id },
            data: {
              status: 'inactive',
            },
          });
        } else {
          console.log(
            `No subscription found for stripeSubscriptionId: ${subscription.id}`
          );
        }

        break;
      }
      default: {
        console.log(`Unhandled event type ${event.type}`);
      }
    }
  } catch (err) {
    console.error('stripe error: ' + err + ' | EVENT TYPE: ' + event.type);
    return NextResponse.error();
  }

  return NextResponse.json({});
}
