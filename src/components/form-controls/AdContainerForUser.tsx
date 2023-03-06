import {
  Typography,
  CardHeader,
  Card,
  CardContent,
  CardMedia,
  Paper,
  IconButton,
} from '@mui/material';
import axios from 'axios';
import config from '../../config';
import DeleteIcon from '@mui/icons-material/Delete';

import React, { Component, FC, useState } from 'react';

export default function SinglePost({ data }) {
  const handleChange = () => {
    const url = `${config.apiUrl}/charity/${data.id}`;
    axios.delete(url);
  };
  return (
    <Card sx={{ width: 330, height: 110 }}>
      <CardHeader
        title={data.title}
        subheader={data.categoryName}
        action={
          <IconButton onClick={handleChange}>
            <DeleteIcon />
          </IconButton>
        }
      />
      <CardContent>
        <Typography variant="body2">{data.descriptions}</Typography>
      </CardContent>
    </Card>
  );
}
