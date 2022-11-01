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
import { object, string, ref } from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import doPostRequest from '../../src/http/auth/signup';
import { height } from '@mui/system';
import SinglePost from '../../src/components/form-controls/AdContainer';
import getCharity from '../../src/http/charity/getAllCharity';
import axios from 'axios';
import config from '../../src/config';

export const CharityPage = () => {
  return <Typography variant="h2">Charity page</Typography>;
};

export default CharityPage;
