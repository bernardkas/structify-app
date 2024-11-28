import { headers } from 'next/headers';
import Stripe from 'stripe';
import prisma from '@/db/db';
import { SubscriptionType } from '@prisma/client';
import { NextResponse } from 'next/server';
import { auth } from '@/auth';

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

  let priceId: string | undefined;
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
              include: { subscriptions: true },
            });
            if (!user) {
              console.log(`User not found with email: ${userEmail}`);
              break;
            }

            const activeSubscription = user.subscriptions.find(
              sub => sub.status === 'active'
            );

            const trialEligible = !activeSubscription;
            const trialEndDate = trialEligible
              ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
              : null;

            let subscriptionType: SubscriptionType;
            if (
              priceId === process.env.NEXT_PUBLIC_STANDARD_PRICE_ID
            ) {
              subscriptionType = SubscriptionType.STANDARD;
            } else if (priceId === process.env.NEXT_PUBLIC_ENTERPRIES_PRICE_ID) {
              subscriptionType = SubscriptionType.ENTERPRISE;
            } else {
              console.log('Unknown price ID, no subscription type matched.');
              break;
            }

            if (activeSubscription) {
              await prisma.user.update({
                where: { id: user.id },
                data: {
                  subscriptionType: subscriptionType
                }
              })

              await prisma.subscription.update({
                where: { id: activeSubscription.id },
                data: {
                  status: 'active',
                  isTrialActive: false,
                  priceId: priceId,
                  updatedAt: new Date(),
                },
              });
            } else {
              await prisma.user.update({
                where: { id: user.id },
                data: {
                  subscriptionType: subscriptionType
                }
              })
              await prisma.subscription.create({
                data: {
                  userId: user.id,
                  customerId: customerId,
                  status: 'active',
                  priceId: priceId,
                  isTrialActive: subscriptionType === 'ENTERPRISE' ? false : trialEligible,
                  trialEndDate: subscriptionType === 'ENTERPRISE' ? null : trialEndDate,
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
        const subscription = await stripe.subscriptions.retrieve(data.object.id);
        const priceId = subscription.items.data[0]?.price.id;

        const customerId = subscription?.customer as any;
        const customer = await getCustomerEmail(customerId);

        // Find the user by email
        const user = await prisma.user.findUnique({
          where: { email: customer as string },  
          include: { subscriptions: true },
        });
      
        if (!priceId) {
          console.log('No price ID found in subscription.');
          break;
        }
      
        let subscriptionType: SubscriptionType;
        if (
          priceId === process.env.NEXT_PUBLIC_STANDARD_PRICE_ID
        ) {
          subscriptionType = SubscriptionType.STANDARD;
        } else if (priceId === process.env.NEXT_PUBLIC_ENTERPRIES_PRICE_ID) {
          subscriptionType = SubscriptionType.ENTERPRISE;
        } else {
          console.log('Unknown price ID, no subscription type matched.');
          break;
        }
      
        const existingSubscription = await prisma.subscription.findUnique({
          where: { customerId: subscription.customer as string },
        });
      
        if (existingSubscription) {
          await prisma.user.update({
            where: { id: user?.id },
            data: {
              subscriptionType: subscriptionType
            }
          })

          await prisma.subscription.update({
            where: { id: existingSubscription.id },
            data: {
              priceId: priceId,
              status: 'active',
              updatedAt: new Date(),
              isTrialActive: false,
            },
          });

          
          console.log(`Subscription type updated to: ${subscriptionType}`);
        } else {
          console.log(`No subscription found for customer ID: ${subscription.customer}`);
        }
      
        break;
      }
      
      
      
      // case 'customer.subscription.trial_will_end': {
      //   const subscriptionId = data.object.id;  
  
      //   const subscription = await stripe.subscriptions.retrieve(subscriptionId);

      //   const customerId = subscription?.customer as any;
      //   const customer = await getCustomerEmail(customerId);

      //   // Find the user by email
      //   const user = await prisma.user.findUnique({
      //     where: { email: customer as string },  
      //     include: { subscriptions: true },
      //   });
      
      //   console.log('Subscription deleted:', subscription);
      
      //   // Find the subscription in the database
      //   const existingSubscription = await prisma.subscription.findUnique({
      //     where: { customerId: subscription.customer as string },
      //   });
      
      //   if (existingSubscription) {
      //     await prisma.subscription.update({
      //       where: { id: existingSubscription.id },
      //       data: {
      //         status: 'active',
      //         updatedAt: new Date(),
      //         isTrialActive: false,
      //       },
      //     });      
      //   } else {
      //     console.log(
      //       `No subscription found for subscription ID: ${subscriptionId}`
      //     );
      //   }
      //   break;
      // }

      case 'customer.subscription.deleted': {
        const subscription = await stripe.subscriptions.retrieve(
          data.object.id
        );

        const customerId = subscription?.customer as any;
        const customer = await getCustomerEmail(customerId);

        // Find the user by email
        const user = await prisma.user.findUnique({
          where: { email: customer as string },  
          include: { subscriptions: true },
        });

        // Find the subscription in the database
        const existingSubscription = await prisma.subscription.findUnique({
          where: { customerId: subscription.customer as any },
        });

        if (existingSubscription) {
          await prisma.user.update({
            where: { id: user?.id },
            data: {
              subscriptionType: 'TRIAL'
            }
          })
          // Delete the subscription from the database
          await prisma.subscription.update({
            where: { id: existingSubscription.id },
            data: {
              status: 'inactive',
              updatedAt: new Date(),
              isTrialActive: false,
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
