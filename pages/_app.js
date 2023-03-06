import '../styles/global.css';
import React, { FC, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PageLayout from '../src/components/msal/PageLayout';
import ProfileContent from '../src/components/msal/ProfileContent';
import { SignOutButton } from '../src/components/form-controls/SignOutButton';
import AppLink from '../src/components/form-controls/AppLink';

import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from '../src/components/msal/authConfig';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from '@azure/msal-react';
import { set } from 'date-fns';

//const msalInstance = new PublicClientApplication(msalConfig);

export default function App({ Component, pageProps }) {
  const [authorized, setAuthorized] = useState(false);
  const [data, setData] = useState(Object);

  useEffect(() => {
    const item = localStorage.getItem('token');
    setData(item);
    if ('token' in localStorage) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }
  }, []);
  const handleLoginState = useCallback(
    (islogined) => {
      setAuthorized(islogined);
    },
    [setAuthorized]
  );
  return (
    <>
      <React.StrictMode>
        <AppBar position="flex">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="logo"
              href="/"
            >
              <CatchingPokemonIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 2 }}>
              VRAPP
            </Typography>
            {authorized ? (
              <AppLink href={`/user/${localStorage.getItem('id')}`}>
                <Button color="inherit" startIcon={<AccountCircleIcon />}>
                  Profile
                </Button>
              </AppLink>
            ) : (
              <AppLink href={'/auth/login'}>
                <Button color="inherit" startIcon={<AccountCircleIcon />}>
                  Profile
                </Button>
              </AppLink>
            )}

            {authorized ? (
              <AppLink href={'/charity/newcharity'}>
                <Button color="inherit" startIcon={<AddCircleIcon />}>
                  Add new ad
                </Button>
              </AppLink>
            ) : (
              <AppLink href={'/auth/login'}>
                <Button color="inherit" startIcon={<AddCircleIcon />}>
                  Add new ad
                </Button>
              </AppLink>
            )}
            {authorized ? (
              <SignOutButton onLoginStateChange={handleLoginState} />
            ) : (
              <AppLink href={'/auth/login'}>
                <Button color="inherit" startIcon={<AccountCircleIcon />}>
                  Log in
                </Button>
              </AppLink>
            )}
          </Toolbar>
        </AppBar>
        <Component {...pageProps} onLoginStateChange={handleLoginState} />
      </React.StrictMode>
      {pageProps.children}
    </>
  );
}
