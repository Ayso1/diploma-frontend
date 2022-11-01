import React, { FC, useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Box,
  InputLabel,
  FormControl,
  MenuItem,
  Snackbar,
  Alert,
  CircularProgress,
  Grid,
} from '@mui/material';
import { object, string } from 'yup';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import doPost from '../../src/http/charity/newcharity';
import ImagesContainer from '../../src/components/form-controls/ImagesContainer';
import ReactSelect from 'react-select';

const schema = object({
  title: string().required('Title is required'),
  description: string().required('Descriptions is required'),
  //photos: string().required('Photos is required'),
  //userId: string().required('user id is required'),
  categorieId: string().required('Categorie is required'),
});

export const CreateCharity = () => {
  const [category, setCategory] = useState('');
  const [file, setFile] = useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [er, setError] = useState(false);

  function handleChangePhoto(e) {
    let url = URL.createObjectURL(e.target.files[0]);
    setFile(url);
    console.log(url);
  }

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
    register,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    alert(JSON.stringify(data));
    setLoading(true);
    try {
      await doPost(data);
      setLoading(false);
      setOpen(true);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box textAlign={'center'} display="block" p={5} gap={2}>
        <Typography variant="h2">Create a post</Typography>

        <Box pt={3}>
          <Controller
            name="title"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label="Title:"
                variant="outlined"
                required
                id="title"
                style={{ width: 400, marginBottom: '1.5em' }}
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
          />
        </Box>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Controller
            name="categorieId"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Select
                labelId="categorieId"
                id="categorieId"
                value={value}
                label="Category"
                style={{ width: 400, marginBottom: '1.5em' }}
                onChange={onChange}
                error={!!error}
              >
                <MenuItem value={1}>Housing</MenuItem>
                <MenuItem value={2}>Сlothing</MenuItem>
              </Select>
            )}
          />
        </FormControl>

        <Box>
          <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label="Description:"
                variant="outlined"
                multiline
                rows={5}
                required
                id="description"
                style={{ width: 400, marginBottom: '1.5em' }}
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
          />
        </Box>
        <Grid
          container
          direction="column"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Grid item>
            <Controller
              name="photos"
              control={control}
              render={({ field }) => (
                <ImagesContainer {...field} name="photos" />
              )}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          startIcon={<AppRegistrationIcon />}
        >
          Create a post
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
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            Error!
          </Alert>
        </Snackbar>
      </Box>
    </form>
  );
};

export default CreateCharity;
