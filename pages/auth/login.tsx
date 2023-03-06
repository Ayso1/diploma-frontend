import React, { FC, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  TextField,
  Grid,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
  Paper,
  Box,
} from '@mui/material';
import { object, string, ref } from 'yup';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import checkJWT from '../../src/http/auth/login';
import bcrypt from 'bcryptjs';

import axios from 'axios';
import config from '../../src/config';
import createMixins from '@mui/material/styles/createMixins';
import { route } from 'next/dist/server/router';
import styles from '../../styles/loginPage.module.css';
import { relative } from 'path';
import { style } from '@mui/system';
import { noop } from 'lodash';

const schema = object({
  email: string()
    .email('Email must be a valid email address')
    .required('Email is required'),
  password: string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export const SignUp = ({ onLoginStateChange = noop }) => {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [data1, setData] = useState(Object);
  const [loading, setLoading] = React.useState(false);
  const [er, setError] = useState(false);
  const [er1, setError1] = useState(false);
  const router = useRouter();
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
  const {
    handleSubmit,
    control,
    formState: { errors, ...fs },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    setLoading(true);
    //debugger;
    try {
      let res = await axios.get(`${config.apiUrl}/user`, {
        params: {
          filterByEmail: data.email,
        },
      });
      setData(res.data);
      console.log(data1);
      const newdata = res.data;
      if (data.email == newdata.email) {
        if (await bcrypt.compare(data.password, newdata.password)) {
          try {
            let res2 = await axios.get(`${config.apiUrl}/user`, {
              params: {
                filterByEmail: data.email,
              },
            });
            const newJWT = res2.data;
            await checkJWT(newJWT);
            setLoading(false);
            localStorage.setItem('token', newJWT.token);
            localStorage.setItem('id', newJWT.id);
            setOpen(true);
            onLoginStateChange(true);
            router.push('http://localhost:3001');
          } catch (error) {
            setLoading(false);
            setError(true);
          }
        } else {
          //alert(JSON.stringify('pass incorrect'));
          setLoading(false);
          setError1(true);
        }
      } else {
        alert(JSON.stringify('email incorrect'));
        setLoading(false);
        setError(true);
      }
      //setOpen(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Typography className={styles.formTitle} color="#303030" variant="h2">
          Log in
        </Typography>
        <div className={styles.form_div}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label="Email:"
                variant="outlined"
                required
                id="email"
                type="email"
                style={{ width: 350, marginBottom: '1.5em' }}
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
          />
        </div>
        <div className={styles.formDiv}>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label="Password: "
                variant="outlined"
                required
                type="password"
                id="password"
                style={{ width: 350 }}
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={errors.password ? errors.password.message : ' '}
              />
            )}
          />
        </div>
        <div className={styles.from_div2}>
          <Button
            type="submit"
            variant="contained"
            className={styles.button}
            disabled={loading}
            style={{ width: 150 }}
            startIcon={<AppRegistrationIcon />}
          >
            Log in
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

          <Snackbar
            open={er}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: '100%' }}
            >
              Error!
            </Alert>
          </Snackbar>
          <Snackbar
            open={open1}
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

          <Snackbar
            open={er1}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: '100%' }}
            >
              Password incorrect!
            </Alert>
          </Snackbar>
        </div>
        <div>
          <div>
            {' '}
            <a href="#">Forgot password</a>
          </div>
          <p>
            New User? <a href="/auth/signup">Create account</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
