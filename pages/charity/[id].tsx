import React, { FC, useState, useEffect } from 'react';
import { Button, CircularProgress, Snackbar, Alert } from '@mui/material';
import { useRouter } from 'next/router';

import axios from 'axios';
import config from '../../src/config';
import SlickContainer from '../../src/components/form-controls/SlickContainer';
import { info } from 'console';
import styles from '../../styles/charity.module.css';
import { style } from '@mui/system';
import sendEmail from '../../src/http/auth/sendEmail';

export const CharityPage = () => {
  const [data, setData] = useState(Object);
  const [info, setInfo] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [er, setError] = useState(false);
  const [dataForEmail, setDataForEmail] = useState(Object);
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setError(false);
  };
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
        setDataForEmail(res.data.user);
        setPhotos(JSON.parse(res.data.photos));
      },
      (error) => {
        console.error('Error fetching data: ', error);
      }
    );

    setLoading(false);
  };
  const handleChange = () => {
    try {
      const url = `${config.apiUrl}/user/email`;
      sendEmail(data, dataForEmail);
      setLoading(false);
      setOpen(true);
    } catch {
      setLoading(false);
      setError(true);
    }
  };
  useEffect(() => {
    allData();
  }, []);

  return (
    <div className={styles.container}>
      <div className="overlay hidden"></div>
      <div className={styles.grid}>
        <div className={styles.form}>
          <div className={styles.slick}>
            <SlickContainer data={photos} />
          </div>
          <div className={styles.details}>
            <h1>{data.title}</h1>
            <h2>Description:</h2>
            <p>{data.descriptions}</p>
          </div>
        </div>

        <div className={styles.userform}>
          <div className={styles.details}>
            <h2>How to contact:</h2>
            <p>{data.contacts}</p>

            <Button type="submit" variant="contained" onClick={handleChange}>
              Notify
            </Button>
            {loading && (
              <CircularProgress
                size={70}
                sx={{
                  position: 'absolute',
                }}
              />
            )}
            <Snackbar
              open={open}
              autoHideDuration={3000}
              onClose={handleClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: '100%' }}
              >
                Success!
              </Alert>
            </Snackbar>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharityPage;
