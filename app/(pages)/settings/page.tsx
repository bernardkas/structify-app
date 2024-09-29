import { auth } from '@/auth';
import SettingsForm from '@/components/settings/settings-form';
import React from 'react';

const SettingsPage = async () => {
  const currentUser = await auth();
  return (
    <div>
      <SettingsForm currentUser={currentUser?.user} />
    </div>
  );
};

export default SettingsPage;
