import React from 'react';
import { Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppLink from './AppLink';
import { useRouter } from 'next/router';

export const SignInButton = () => {
  const handleLogin = (loginType) => {};
  return (
    <AppLink href={'/auth/login'}>
      <Button
        variant="contained"
        className="ml-auto"
        onClick={() => handleLogin('popup')}
        startIcon={<AccountCircleIcon />}
      >
        Sign in
      </Button>
    </AppLink>
  );
};
export default SignInButton;
