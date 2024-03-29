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
import { cloneDeep } from 'lodash';
import styles from '../../styles/signup.module.css';
import { useRouter } from 'next/router';

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
  const router = useRouter();
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
    let newdata = cloneDeep(data);
    delete newdata.passwordConfirm;
    try {
      await doPostRequest(newdata);
      setLoading(false);
      setOpen(true);
      router.push('http://localhost:3001');
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Typography className={styles.formTitle} variant="h2">
          Sign up
        </Typography>
        <div className={styles.form_div}>
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
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
        </div>
        <div className={styles.form_div}>
          <Controller
            name="lastName"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
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
        </div>
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
                style={{ width: 300, marginBottom: '1.5em' }}
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
          />
        </div>
        <div className={styles.form_div}>
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
                style={{ width: 300 }}
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={errors.password ? errors.password.message : ' '}
              />
            )}
          />
        </div>
        <div className={styles.form_div}>
          <Controller
            name="passwordConfirm"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
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
        </div>
        <div className={styles.from_div2}>
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
        </div>
      </form>
    </div>
  );
};

export default SignUp;
