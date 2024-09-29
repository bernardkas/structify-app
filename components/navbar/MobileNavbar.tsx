import Link from 'next/link';
import React from 'react';
import UserButton from '../auth/user-button';
import { auth } from '@/auth';

interface MobileNavbarProps {
  currentUser: any;
  onClose: () => void;
}

const MobileNavbar = ({ currentUser, onClose }: MobileNavbarProps) => {
  return (
    <div className='flex justify-start'>
      <div className=' flex flex-col items-start justify-start gap-5 '>
        {!currentUser ? (
          <Link
            onClick={onClose}
            className='mx-2 font-noto-sans font-[500] text-base text-white bg-orange-500 p-1 rounded-sm w-[100px] text-center'
            href='/auth/sign-in'>
            Login
          </Link>
        ) : (
          <>
            <Link
              className='mx-2 font-noto-sans font-[500] text-base text-gray-800'
              href='/settings'>
              Dashboard
            </Link>
            <UserButton currentUser={currentUser} onClose={onClose} />
          </>
        )}
      </div>
    </div>
  );
};

export default MobileNavbar;
