import React, { FC, useState } from 'react';
import {
  Button,
  TextField,
  Grid,
  Fab,
  Typography,
  Box,
  Paper,
  InputLabel,
  FormControl,
  MenuItem,
  Snackbar,
  Alert,
  CircularProgress,
  Card,
  CardActionArea,
  CardMedia,
} from '@mui/material';
import { object, string, InferType, ref } from 'yup';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Select, { SelectChangeEvent } from '@mui/material/Select';
//import doPost from '../../src/http/charity/newcharity';
import ImagesContainer from '../../src/components/form-controls/ImagesContainer';

const schema = object({
  title: string().required('Title is required'),
  descriptions: string().required('Descriptions is required'),
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
    setLoading(true);
    const _ = require('lodash');
    let newdata = _.cloneDeep(data);
    delete newdata.passwordConfirm;
    try {
      //console.log(file);
      //await getPhotoLinks(file);
      //console.log(getPhotoLinks(file));
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
          <Select
            labelId="category-select-label"
            id="category-select"
            value={category}
            label="Category"
            style={{ width: 400, marginBottom: '1.5em' }}
            onChange={handleChange}
          >
            <MenuItem value={1}>Housing</MenuItem>
            <MenuItem value={2}>Сlothing</MenuItem>
          </Select>
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
        <ImagesContainer name="photos" register={register} />
        <Box>
          <TextField
            name="upload-photo"
            type="file"
            style={{ width: 400, marginBottom: '1.5em' }}
            variant="outlined"
            inputProps={{
              multiple: true,
            }}
            onChange={handleChangePhoto}
          />
          {file.length > 0 && (
            <Card sx={{ maxWidth: 345, alignItems: 'center' }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Photo"
                  height="194"
                  image={file}
                  title="Photo"
                />
              </CardActionArea>
            </Card>
          )}
        </Box>

        <Button
          type="submit"
          variant="contained"
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
