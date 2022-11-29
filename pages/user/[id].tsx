import React, { FC, useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';

import axios from 'axios';
import config from '../../src/config';

export const UserPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const allData = async () => {
    setLoading(true);
    let query = window.location.href;
    const queryUrl = new URL(query);
    const path = queryUrl.pathname.toString();
    const userId = path.slice(6);
    const url = `${config.apiUrl}/user/${userId}`;
    axios.get(url).then(
      (res) => {
        console.log(res);
        setData(res.data);
      },
      (error) => {
        console.error('Error fetching data: ', error);
      }
    );

    setLoading(false);
  };
  useEffect(() => {
    allData();
  }, []);
  return <Box textAlign={'center'} display="block" p={5} gap={2}></Box>;
};
export default UserPage;
