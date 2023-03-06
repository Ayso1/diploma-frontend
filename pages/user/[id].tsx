import React, { FC, useState, useEffect } from 'react';
import { Typography, Box, Grid, ButtonBase, Button } from '@mui/material';
import { useRouter } from 'next/router';
import SinglePost from '../../src/components/form-controls/AdContainerForUser';
import PaginationM from '../../src/components/form-controls/PaginationMaterial';
import AppLink from '../../src/components/form-controls/AppLink';

import axios from 'axios';
import config from '../../src/config';
import styles from '../../styles/user.module.css';

export const UserPage = () => {
  const router = useRouter();
  const [userdata, setUserData] = useState(Object);
  const [data, setData] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [arrayIsEmpty, setArrayIsEmpty] = useState(false);
  const [postPerPage] = useState(8);
  const allData = async () => {
    setLoading(true);
    let query = window.location.href;
    const queryUrl = new URL(query);
    const path = queryUrl.pathname.toString();
    const userId = path.slice(6);
    const url = `${config.apiUrl}/charity`;
    const urlForUser = `${config.apiUrl}/user/${userId}`;
    axios
      .get(url, {
        params: {
          filterByUsersId: userId,
        },
      })
      .then(
        (res) => {
          setData(
            res.data.data.map(({ createdAt, photos, ...res }) => ({
              ...res,
              photos: JSON.parse(photos),
              createdAt: new Date(createdAt),
            }))
          );
        },
        (error) => {
          console.error('Error fetching data: ', error);
        }
      );
    axios.get(urlForUser).then(
      (res) => {
        setUserData(res.data);
      },
      (error) => {
        console.error('Error fetching data: ', error);
      }
    );

    setLoading(false);
  };
  useEffect(() => {
    allData();
    console.log(data);
    if (data.length == 0) {
      setArrayIsEmpty(true);
    } else {
      setArrayIsEmpty(false);
    }
  }, []);
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = data.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleChange = () => {
    const url = `${config.apiUrl}/user/${userdata.id}`;
    axios.delete(url);
    router.push('http://localhost:3001');
  };
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1>
          {userdata.firstName} {userdata.lastName}
        </h1>
        {arrayIsEmpty ? (
          <Button
            type="submit"
            variant="contained"
            onClick={handleChange}
            className={styles.button}
          >
            Delete account
          </Button>
        ) : (
          <Button
            type="submit"
            onClick={handleChange}
            variant="contained"
            className={styles.button}
          >
            Delete account
          </Button>
        )}
      </div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          direction="column"
          justifyContent="flex-end"
          alignItems="center"
          style={{ minHeight: '20vh' }}
          spacing={1}
        >
          <Grid container>
            {data.map((item) => (
              <Grid item key={item.id} xs={6} md={3} lg={3} p={3}>
                <ButtonBase onClick={() => {}}>
                  <SinglePost data={item} />
                </ButtonBase>
              </Grid>
            ))}
          </Grid>
          <Grid
            direction="column"
            justifyContent="flex-end"
            alignItems="center"
          ></Grid>
        </Grid>
      </Box>
    </div>
  );
};
export default UserPage;
