'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { UserWithDetials } from '@/types/UserType';
import { useTranslations } from 'next-intl';

interface SubscriptionProps {
  session: any;
  user: UserWithDetials;
  handleSubscription?: (priceId: string) => void;
  loading?: boolean;
}

const Subscription = ({ session, user }: SubscriptionProps) => {
  const t = useTranslations('Price');

  const price = [
    {
      priceId: process.env.NEXT_PUBLIC_STANDARD_PRICE_ID || '',
      name: t('name1'),
      description: t('description1'),
      color: '#7872f4',
      features: [
        t('f1'),
        t('f2'),
        t('f3'),
        t('f4'),
        t('f5'),
        t('f6'),
        t('f7'),
        t('f8'),
      ],
      price: '14.99€',
      timeFrame: t('timeFrame1'),
      btnText: t('btnText1'),
      free: t('free1'),
      href: '',
      link: process.env.NEXT_PUBLIC_STANDARD_PAYEMNT_LINK || '',
    },
    {
      priceId: process.env.NEXT_PUBLIC_ENTERPRIES_PRICE_ID || '',
      name: t('name2'),
      description: t('description2'),
      color: '#c66eef',
      features: [
        t('f9'),
        t('f10'),
        t('f11'),
        t('f12'),
        t('f13'),
        t('f14'),
        t('f15'),
        t('f16'),
      ],
      price: '29.99€',
      timeFrame: t('timeFrame2'),
      btnText: t('btnText2'),
      href: '',
      link: process.env.NEXT_PUBLIC_ENTERPRIES_PAYMENT_LINK || '',
    },
  ];
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
            {activePriceId === item.priceId &&
              hasUsedTrial &&
              !isEnterprise && (
                <div className='absolute top-0 right-0 p-2 '>
                  <p className='text-sm text-slate-300'>
                    {t('freeTrialActive')}
                  </p>
                </div>
              )}
            {activePriceId === item.priceId && !hasUsedTrial && (
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
            {showFreeTrial && <p>{item.free}</p>}
            <p className='text-xl font-bold font-sans mb-2'>
              {item.price} <label className='text-sm'>{item.timeFrame}</label>{' '}
            </p>
            {item.priceId === process.env.NEXT_PUBLIC_STANDARD_PRICE_ID && user?.subscriptions?.length === 0  && showFreeTrial ? (
              <Button className='rounded-[50px]'>
                <Link
                  target='_blank'
                  href={
                    item.link +
                    '?prefilled_email=' +
                    session?.user?.email
                  }>
                  {t('freeTrial')}
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
