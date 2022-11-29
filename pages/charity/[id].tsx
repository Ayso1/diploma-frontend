import React, { FC, useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { useRouter } from 'next/router';

import axios from 'axios';
import config from '../../src/config';
import SlickContainer from '../../src/components/form-controls/SlickContainer';
import { info } from 'console';

export const CharityPage = () => {
  const [data, setData] = useState([]);
  const [info, setInfo] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const allData = async () => {
    setLoading(true);
    let query = window.location.href;
    const queryUrl = new URL(query);
    const path = queryUrl.pathname.toString();
    const charityId = path.slice(9);
    const url = `${config.apiUrl}/charity/${charityId}`;
    axios.get(url).then(
      (res) => {
        console.log(res);
        setData(res.data);
        setPhotos(JSON.parse(res.data.photos));
        console.log(data);
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

  return (
    <Box textAlign={'center'} display="block" p={5} gap={2}>
      <Typography variant="h2">{data.title}</Typography>
      <Typography>{/*data.categorie.name*/}</Typography>
      <SlickContainer data={photos} />
      <Box pt={3}>
        <div>{data.descriptions}</div>
      </Box>
      <Box pt={3}>
        <div>
          {/*data.user.firstName*/},{/*data.user.lastName*/}
        </div>
      </Box>
    </Box>
  );
};

export default CharityPage;
