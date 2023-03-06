import React, { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  Grid,
  Box,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  ButtonBase,
  Typography,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import SinglePost from '../src/components/form-controls/AdContainer';
import axios from 'axios';
import config from '../src/config';
import AppLink from '../src/components/form-controls/AppLink';
import Pagination from '../src/components/form-controls/Pagination';
import PaginationM from '../src/components/form-controls/PaginationMaterial';

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [selectItem, setSelect] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(8);
  const router = useRouter();

  const allData = async () => {
    setLoading(true);
    const url = `${config.apiUrl}/charity`;
    let query = window.location.href;
    const queryUrl = new URL(query);
    let categorieIdForFilter = queryUrl.searchParams.get('key');
    axios
      .get(url, {
        params: {
          filterByCategoriesId: categorieIdForFilter,
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
    setLoading(false);
  };
  useEffect(() => {
    allData();
  }, []);

  const handleChange = (e) => {
    setSelect(e.target.value);
  };
  const handleClick = (e) => {
    setLoading(true);
    e.preventDefault();
    const url = `${config.apiUrl}/charity`;
    axios
      .get(url, {
        params: {
          filterByCategoriesId: selectItem,
        },
      })
      .then(
        (res) => {
          console.log(res);
          router.replace({
            query: { ...router.query, key: selectItem },
          });
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
    setLoading(false);
  };
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = data.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box>
        <Grid
          container
          direction="column"
          justifyContent="flex-end"
          alignItems="center"
          style={{ minHeight: '15vh' }}
          spacing={2}
        >
          <Grid item>
            <FormControl>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="categorieId"
                id="categorieId"
                label="Category"
                value={selectItem}
                onChange={handleChange}
                style={{ width: 300, marginBottom: '1.5em' }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Housing</MenuItem>
                <MenuItem value={2}>Сlothing</MenuItem>
                <MenuItem value={3}>Transport</MenuItem>
                <MenuItem value={4}>For animals</MenuItem>
                <MenuItem value={5}>For kids</MenuItem>
                <MenuItem value={6}>Medications and hygiene products</MenuItem>
                <MenuItem value={7}>Work</MenuItem>
                <MenuItem value={8}>Medical care</MenuItem>
                <MenuItem value={9}>Requests for help</MenuItem>
              </Select>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              style={{ width: 'flex', marginBottom: '1.5em', height: 60 }}
              onClick={handleClick}
              startIcon={<SearchIcon />}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Grid container>
        {currentPost.map((item) => (
          <Grid item key={item.id} xs={6} md={3} lg={3} p={3}>
            <ButtonBase onClick={() => {}}>
              <AppLink href={'/charity/' + item.id}>
                <SinglePost data={item} />
              </AppLink>
            </ButtonBase>
          </Grid>
        ))}
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        alignItems="center"
        style={{ minHeight: '5vh' }}
        spacing={1}
      >
        <Grid direction="column" justifyContent="flex-end" alignItems="center">
          <PaginationM
            postsPerPage={postPerPage}
            totalPosts={data.length}
            paginate={paginate}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
