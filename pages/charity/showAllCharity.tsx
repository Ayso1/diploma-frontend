import React, { FC, useState, useEffect } from 'react';
import {
  Button,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Stack,
  Typography,
  Box,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  ButtonBase,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import SinglePost from '../../src/components/form-controls/AdContainer';
import getCharity from '../../src/http/charity/getAllCharity';
import axios from 'axios';
import config from '../../src/config';

export const MainPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [selectItem, setSelect] = useState();
  const allData = async () => {
    setLoading(true);
    const url = `${config.apiUrl}/charity`;
    axios
      .get(url, {
        params: {
          //filterByCategoriesId: '1',
        },
      })
      .then(
        (res) => {
          console.log(res);
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
          setData(res.data.data);
        },
        (error) => {
          console.error('Error fetching data: ', error);
        }
      );
    setLoading(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box>
        <Grid
          container
          direction="column"
          justifyContent="flex-end"
          alignItems="center"
          style={{ minHeight: '15vh' }}
          spacing={3}
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
        {data.map((item) => (
          <Grid item key={item.id} xs={6} md={3} lg={3} p={3}>
            <ButtonBase onClick={() => {}}>
              <a href={'/charity/' + item.id}>
                <SinglePost data={item} />
              </a>
            </ButtonBase>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MainPage;
