import Stripe from 'stripe';
import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/db/db';
import schedule from 'node-schedule';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);
export async function POST(req: NextRequest) {
  const payload = await req.text();

  const sig = req.headers.get('Stripe-Signature');
  try {
    let event = stripe.webhooks.constructEvent(
      payload,
      sig!,
      process.env.STRIPE_WEBOOK_SECRET!
    );

    const session = event.data.object as Stripe.Checkout.Session;
    const customerId = session.metadata?.userId;
    const paymentDate = new Date(session.created * 1000);

    if (event.type === 'charge.succeeded') {
      await prisma.user.update({
        where: {
          id: String(customerId),
        },
        data: {
          subscription: 'PREMIUM',
          subscriptionsDate: paymentDate,
        },
      });

      await prisma.nameTable.updateMany({
        where: {
          userId: String(customerId),
        },
        data: {
          isPaid: true,
        },
      });

      scheduleSubscriptionReversion(paymentDate, customerId);

      return NextResponse.json({
        message: 'Subscription updated successfully',
      });
    } else {
      console.log('Not worked');
      return NextResponse.error();
    }
  } catch (err) {
    console.log(err);
  }

  return new Response('', { status: 200 });
}

async function revertToBasic(customerId: number) {
  await prisma.user.update({
    where: {
      id: String(customerId),
    },
    data: {
      subscription: 'BASIC',
    },
  });

  await prisma.nameTable.updateMany({
    where: {
      userId: String(customerId),
    },
    data: {
      isPaid: false,
    },
  });
}

function scheduleSubscriptionReversion(paymentDate: any, customerId: any) {
  const oneMonthLater = new Date(
    paymentDate.getTime() + 30 * 24 * 60 * 60 * 1000
  );
  // const revertDate = new Date(paymentDate.getTime() + 3 * 60 * 1000); for testing only 3 min revert

  const job = schedule.scheduleJob(oneMonthLater, async () => {
    await revertToBasic(customerId);
  });

  return job;
}
