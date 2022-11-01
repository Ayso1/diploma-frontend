import React, { FC, useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Stack,
  Typography,
  Box,
  InputLabel,
  Snackbar,
  Alert,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  ButtonBase,
} from '@mui/material';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import SinglePost from '../../src/components/form-controls/AdContainer';
import getCharity from '../../src/http/charity/getAllCharity';
import axios from 'axios';
import config from '../../src/config';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const navigate = useNavigate();
  const goToPosts = () =>
    navigate({
      pathname: '/charity/showAllCharity',
      search: '?sort=date&order=newest',
    });
};

export const MainPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const allData = async () => {
    setLoading(true);
    axios
      .get(
        `${config.apiUrl}/charity?filterByCategoriesId=1&limit=2&offset=1&sortBy=title&sortDirection=ASC`
      )
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
  useEffect(() => {
    allData();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
          >
            <CatchingPokemonIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 2 }}>
            VRAPP
          </Typography>
          <Stack direction="row" spacing={3}></Stack>
          <Button color="inherit" startIcon={<AddCircleIcon />}>
            Add new ad
          </Button>
          <Button color="inherit" startIcon={<AccountCircleIcon />}>
            Your profile
          </Button>
        </Toolbar>
      </AppBar>
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
