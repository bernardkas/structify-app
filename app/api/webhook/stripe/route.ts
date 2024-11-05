import { headers } from 'next/headers';
import Stripe from 'stripe';
import { price } from '../../../../components/price/Subscription';
import prisma from '@/db/db';
import { SubscriptionType } from '@prisma/client';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
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
    console.error("Error fetching customer:", err);

    return null;
  }
}

console.log('data', data)
console.log('event', event)


  try {
    switch (event.type) {
      case 'checkout.session.completed': {  
        try {
          const session = await stripe.checkout.sessions.retrieve(
            data.object,
            { expand: ['line_items'] }
          );
      
          const customerId = session?.customer_details?.email as any;
          const customer = await getCustomerEmail(customerId)
      
          let priceId: string | undefined;
          if (session?.line_items?.data?.[0]?.price?.id) {
            priceId = session.line_items.data[0].price.id;
            console.log('Price ID:', priceId);
          } else {
            console.log('No price ID found in session.');
            break;
          }
      
          const plan = price.find(item => item.priceId === priceId);
          if (!plan) {
            console.log('No matching plan found for price ID:', priceId);
            break;
          }
      
          if (customer) {
            const userEmail = customer as string;
            console.log('Customer email:', userEmail);
      
            // Find the user by email
            const user = await prisma.user.findUnique({ where: { email: userEmail } });
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
            const subscription = await prisma.subscription.findUnique({
              where: { stripeSubscriptionId: data.object.id }
            });
      
            if (subscription) {
              console.log('Updating existing subscription for user:', userEmail);
              await prisma.subscription.update({
                where: { id: subscription.id },
                data: {
                  type: subscriptionType,
                  status: 'active',
                  priceId: priceId,
                  updatedAt: new Date(),
                }
              });
            } else {
              console.log('Creating new subscription for user:', userEmail);
              await prisma.subscription.create({
                data: {
                  userId: user.id,
                  stripeSubscriptionId: data.object.id,
                  status: data?.object?.status,
                  priceId: priceId,
                  type: subscriptionType,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                }
              });
            }
          }
        } catch (err) {
          console.error('Error handling checkout.session.completed:', err);
        }

        return NextResponse.json({
          message: 'Subscription updated successfully',
        });

        break;
      }
      
    case 'customer.subscription.deleted': {
      const subscription = await stripe.subscriptions.retrieve(data.object.id);
    
      // Find the subscription in the database
      const existingSubscription = await prisma.subscription.findUnique({
          where: { stripeSubscriptionId: subscription.id }
      });
  
      if (existingSubscription) {
          // Delete the subscription from the database
          await prisma.subscription.delete({
              where: { id: existingSubscription.id }
          });
          console.log(`Subscription deleted and user set to inactive for user ID: ${existingSubscription.userId}`);
      } else {
          console.log(`No subscription found for stripeSubscriptionId: ${subscription.id}`);
      }

      
      return NextResponse.json({});

      break;
    }
      default: {
        console.log(`Unhandled event type ${event.type}`);
      }
    }
  } catch (err) {
    console.error(
      'stripe error: ' + err + ' | EVENT TYPE: ' + event.type
  );
    return NextResponse.error();
  }


  return NextResponse.json({});
}
