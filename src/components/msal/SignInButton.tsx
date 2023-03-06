import React from 'react';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../msal/authConfig';
import { Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

/**
 * Renders a button which, when selected, will open a popup for login
 */
export const SignInButton = () => {
  const { instance } = useMsal();

  const handleLogin = (loginType) => {
    if (loginType === 'popup') {
      instance.loginPopup(loginRequest).catch((e) => {
        console.log(e);
      });
    }
  };
  return (
    <Button
      variant="contained"
      className="ml-auto"
      onClick={() => handleLogin('popup')}
      startIcon={<AccountCircleIcon />}
    >
      Sign in
    </Button>
  );
};
export default SignInButton;
