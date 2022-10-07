import React, { FC, useState } from 'react';
import {
  Button,
  TextField,
  Grid,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import { object, string, ref } from 'yup';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import doPostRequest from '../../src/http/auth/signup';

const schema = object({
  firstName: string().required('First name is required'),
  lastName: string().required('Last name is required'),
  email: string()
    .email('Email must be a valid email address')
    .required('Email is required'),
  password: string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  passwordConfirm: string()
    .required('Passwords does not match')
    .oneOf([ref('password'), null], 'Passwords must match'),
});

export const SignUp = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [er, setError] = useState(false);
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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    setLoading(true);
    const _ = require('lodash');
    let newdata = _.cloneDeep(data);
    delete newdata.passwordConfirm;
    try {
      await doPostRequest(newdata);
      setLoading(false);
      setOpen(true);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        alignItems="center"
        style={{ minHeight: '80vh' }}
        spacing={3}
      >
        <Grid item>
          <Typography variant="h2">Sign up</Typography>
        </Grid>
        <Grid item>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="First name: "
                  variant="outlined"
                  id="firstName"
                  required
                  fullWidth
                  style={{ width: 300, marginBottom: '1.5em' }}
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="Last name:"
                  variant="outlined"
                  required
                  id="lastName"
                  style={{ width: 300, marginBottom: '1.5em' }}
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="Email:"
                  variant="outlined"
                  required
                  id="email"
                  type="email"
                  style={{ width: 300, marginBottom: '1.5em' }}
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="Password: "
                  variant="outlined"
                  required
                  type="password"
                  id="password"
                  style={{ width: 300 }}
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={errors.password ? errors.password.message : ' '}
                />
              )}
            />
            <Controller
              name="passwordConfirm"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="Confirm password:"
                  variant="outlined"
                  required
                  id="passwordConfirm"
                  type="password"
                  style={{ width: 300, marginBottom: '1.5em' }}
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              startIcon={<AppRegistrationIcon />}
            >
              Sigh up
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
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default SignUp;
