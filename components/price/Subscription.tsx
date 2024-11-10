'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import axios from 'axios';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { UserWithDetials } from '@/types/UserType';

interface SubscriptionProps {
  session: any;
  user: UserWithDetials;
  handleSubscription?: (priceId: string) => void;
  loading?: boolean;
}

export const price = [
  {
    priceId: 'price_1QH7jmGSj97UGaVByVJGDj7F',
    freeTrialPriceId: 'price_1QIxRGGSj97UGaVB70TlD0Os',
    name: 'Standard',
    description: 'Most popular',
    color: '#7872f4',
    features: [
      '✅ 100 Client',
      '✅ 500 Projects',
      '✅ 500 Employees',
      '✅ Track employees hours',
      '✅ Track projects hours',
      '✅ Budget and cost tracking',
      '✅ Create Invoices',
      '✅ Remiander',
    ],
    price: '9.99€',
    timeFrame: 'per month',
    btnText: 'Choose plan',
    free: '7 days free then',
    freeTrialLink: 'https://buy.stripe.com/test_dR67vjh14bYuaC428a',
    href: '',
    link: 'https://buy.stripe.com/test_8wMeXL6mq4w26lO288',
  },
  {
    priceId: 'price_1QH7kpGSj97UGaVBbhsehBCi',
    name: 'Enterprise',
    description: 'Used more for large companies',
    color: '#c66eef',
    features: [
      '✅ Unlimited Clients',
      '✅ Unlimited Projects',
      '✅ Unlimited Employees',
      '✅ Track employees hours',
      '✅ Track projects hours',
      '✅ Budget and cost tracking',
      '✅ Create Invoices',
      '✅ Remiander',
    ],
    price: '24.99€',
    timeFrame: 'per month',
    btnText: 'Choose plan',
    href: '',
    link: 'https://buy.stripe.com/test_eVa4j78uy6Ea4dG001',
  },
];

const Subscription = ({ session, user }: SubscriptionProps) => {
  const activeSubscription = user?.subscriptions.find(
    sub => sub?.status === 'active'
  );
  const activePriceId = activeSubscription?.priceId;
  const hasUsedTrial = user?.subscriptions?.some(item => item.isTrialActive);
  const isEnterprise = user?.subscriptionType === 'ENTERPRISE';
  const showFreeTrial = user?.subscriptionType === 'TRIAL';


  return (
    <div className='flex flex-row gap-5 items-center flex-wrap'>
      {price.map(item => (
        <div
          key={item.priceId}
          className='flex flex-col justify-between gap-5 w-[300px] h-[500px] border-[2px] rounded-2xl'>
          <div
            style={{ backgroundColor: item.color }}
            className={` rounded-t-2xl h-[80px] flex justify-center items-center relative`}>
            {activePriceId === item.freeTrialPriceId &&
              hasUsedTrial &&
              !isEnterprise && (
                <div className='absolute top-0 right-0 p-2 '>
                  <p className='text-sm text-slate-300'>Free trial is active</p>
                </div>
              )}
            {activePriceId === item.priceId && (
              <div className='absolute top-0 right-0 p-2 '>
                <Star className='text-2xl font-sans font-bold text-yellow-500' />
              </div>
            )}
            <h1 className='text-2xl font-sans font-bold'>{item.name}</h1>
          </div>
          <div className='flex flex-col items-center'>
            <div className='space-y-2'>
              <h3 className='w-[200px] text-sm text-slate-500'>
                {item.description}
              </h3>
              {item.features.map(future => (
                <ul key={future} className='space-y-2 text-sm'>
                  <li>{future}</li>
                </ul>
              ))}
            </div>
          </div>
          <div className='flex flex-col justify-center items-center mb-3'>
            {
              showFreeTrial &&
       (
                <p>{item.free}</p>
              )}
            <p className='text-xl font-bold font-sans mb-2'>
              {item.price} <label className='text-sm'>{item.timeFrame}</label>{' '}
            </p>
            {
              showFreeTrial &&
            item?.freeTrialLink  ? (
              <Button className='rounded-[50px]'>
                <Link
                  target='_blank'
                  href={
                    item.freeTrialLink +
                    '?prefilled_email=' +
                    session?.user?.email
                  }>
                  Free trial
                </Link>
              </Button>
            ) : (
              <Button className='rounded-[50px]'>
                <Link
                  target='_blank'
                  href={item.link + '?prefilled_email=' + session?.user?.email}>
                  {item?.price}
                </Link>
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Subscription;
