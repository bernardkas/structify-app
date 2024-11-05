import { auth } from '@/auth';
import Subscription from '@/components/price/Subscription';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import React, { useEffect, useState } from 'react';


const PricePage = async () => {
  const session = await auth()
  // const [loading, setLoading] = useState(false);
 

  // const handleSubscription = async (priceId: string) => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.post('/api/subscription', { userId: session?.user.id, priceId });
  //     window.location.href = response.data.url;
  //   } catch (error) {
  //     console.error('Error creating subscription:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  return (
    <div className='flex justify-center mt-5'>
      <Subscription session={session}  />
    </div>
  );
};

export default PricePage;
