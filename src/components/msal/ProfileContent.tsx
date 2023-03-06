import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from '@azure/msal-react';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import { loginRequest } from './authConfig';
import ProfileData from './ProfileData';
import { callMsGraph } from './graph';

function ProfileContent() {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);

  const name = accounts[0] && accounts[0].name;

  function RequestProfileData() {
    const request = {
      ...loginRequest,
      account: accounts[0],
    };

    // Silently acquires an access token which is then attached to a request for Microsoft Graph data
    instance
      .acquireTokenSilent(request)
      .then((response) => {
        callMsGraph(response.accessToken).then((response) =>
          setGraphData(response)
        );
      })
      .catch((e) => {
        instance.acquireTokenPopup(request).then((response) => {
          callMsGraph(response.accessToken).then((response) =>
            setGraphData(response)
          );
        });
      });
  }

  return (
    <>
      <h5 className="card-title">Welcome {name}</h5>
      {graphData ? (
        <ProfileData graphData={graphData} />
      ) : (
        <Button variant="contained" onClick={RequestProfileData}>
          Request Profile Information
        </Button>
      )}
    </>
  );
}
export default ProfileContent;
