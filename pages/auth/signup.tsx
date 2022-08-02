import React, { FC } from 'react';
import { Button, TextField, Grid, Typography } from '@mui/material';
import { object, string, InferType, ref } from 'yup';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

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
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    const _ = require('lodash');
    let newdata = _.cloneDeep(data);
    delete newdata.passwordConfirm;
    alert(JSON.stringify(newdata));
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
              startIcon={<AppRegistrationIcon />}
            >
              Sigh up
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};
//export default SignUp;
export default SignUp;
