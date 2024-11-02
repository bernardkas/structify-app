import { Button } from '@/components/ui/button';
import React from 'react';

const price = [
  {
    id: 1,
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
    id: 2,
    name: 'Premium',
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
  },
  {
    id: 3,
    name: 'Enterprise',
    description: 'Used more for largs company',
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
  },
];

const PricePage = () => {
  return (
    <div className='flex justify-center mt-5'>
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
                  <Button className="rounded-[50px]">{item.btnText}</Button>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricePage;
