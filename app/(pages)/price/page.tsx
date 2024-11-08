import { getUser } from '@/actions/Model/user';
import { auth } from '@/auth';
import Subscription from '@/components/price/Subscription';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import React, { useEffect, useState } from 'react';


const PricePage = async () => {
  const session = await auth()
  const user = await getUser(session?.user.id as string) as any

  return (
    <div className='flex justify-center mt-5'>
      <Subscription session={session} user={user}  />
    </div>
  );
};

export default PricePage;
