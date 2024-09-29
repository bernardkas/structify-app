'use client';
import React from 'react';
import { Button } from '../ui/button';
import { logout } from '@/actions/auth';
const SignOutBtn = () => {
  const onSignOut = () => {
    logout();
  };
  return (
    <div className=''>
      <Button onClick={onSignOut} variant='destructive' type='submit'>
        Sign Out
      </Button>
    </div>
  );
};

export default SignOutBtn;
