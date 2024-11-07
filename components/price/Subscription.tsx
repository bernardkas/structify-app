'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button';
import axios from 'axios';
import Link from 'next/link';

interface SubscriptionProps {
  session: any;
  user: any;
  handleSubscription?: (priceId: string) => void;
  loading?: boolean;
}

export const price = [
  {
    priceId: 'price_1',
    name: 'Basic',
    description: 'This is more for testing the platform',
    color: '#61801d',
    features: [
      '✅ 1 Client',
      '✅ 3 Projects',
      '✅ 3 Employees',
      '✅ Track employees hours',
      '✅ Track projects hours',
      '✅ Budget and cost tracking',
      '❌ Create Invoices',
      '❌ Remiander',
    ],
    price: 'Free',
    btnText: '',
    href: '',
  },
  {
    priceId: 'price_1QH7jmGSj97UGaVByVJGDj7F',
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
    timeFrame: "(monthly)",
    btnText: 'Choose plan',
    href: '',
    link: 'https://buy.stripe.com/test_8wMeXL6mq4w26lO288'
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
    timeFrame: '(monthly)',
    btnText: 'Choose plan',
    href: '',
    link: "https://buy.stripe.com/test_eVa4j78uy6Ea4dG001"
  },
];


const Subscription = ({ session, user}: SubscriptionProps) => {
  console.log('user', user)
  return (
    <div className='flex flex-row gap-5 items-center flex-wrap'>
        {price.map(item => (
          <div className='flex flex-col justify-between gap-5 w-[300px] h-[500px] border-[2px] rounded-2xl'>
            <div
              style={{ backgroundColor: item.color }}
              className={` rounded-t-2xl h-[80px] flex justify-center items-center`}>
              <h1 className='text-2xl font-sans font-bold'>{item.name}</h1>
            </div>
            <div className='flex flex-col items-center'>
                <div className="space-y-2">

              <h3 className="w-[200px] text-sm text-slate-500">{item.description}</h3>
              {item.features.map(future => (
                  <ul className="space-y-2 text-sm">
                  <li>{future}</li>
                </ul>
              ))}
                    </div>
            </div>
            <div className="flex flex-col justify-center items-center mb-3">
                <p className="text-xl font-bold font-sans mb-2">{item.price} <label className="text-sm">{item.timeFrame}</label> </p>
                {item.btnText && (
                  <Button
                  className='rounded-[50px]'>
                <Link target='_blank' href={item.link + '?prefilled_email=' + session?.user?.email}>
                  {item?.price}
                 </Link>
                </Button>
                )}
            </div>
          </div>
        ))}
      </div>
  )
}

export default Subscription