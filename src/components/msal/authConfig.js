export const msalConfig = {
  auth: {
    clientId: 'ab0cfde2-0dec-4e0a-9415-08c4fded41bb',
    authority:
      'https://login.microsoftonline.com/f98f60a2-479f-4b70-ba61-79b5d9b94e7e',
    redirectUri: 'http://localhost:3001',
  },
  cache: {
    cacheLocation: 'sessionStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
  scopes: ['User.Read'],
};

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
};
