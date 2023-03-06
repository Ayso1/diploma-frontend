import React from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { noop } from 'lodash';

/**
 * Renders a button which, when selected, will open a popup for logout
 */
export const SignOutButton = ({ onLoginStateChange = noop }) => {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    onLoginStateChange(false);
    router.push('http://localhost:3001');
  };

  return (
    <Button color="inherit" onClick={() => handleLogout()}>
      Sign out
    </Button>
  );
};
export default SignOutButton;
