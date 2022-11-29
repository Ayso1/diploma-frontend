import {
  Typography,
  CardHeader,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';

import React, { Component, FC, useState } from 'react';

export default function SinglePost({ data }) {
  console.log(data);
  return (
    <Card sx={{ width: 300, height: 300 }}>
      <CardHeader title={data.title} subheader={data.categoryName} />
      <CardMedia component="img" height="150px" image={data.photos[0].url} />
      <CardContent>
        <Typography variant="body2">{data.descriptions}</Typography>
        <Typography variant="body2">{data.user.firstName}</Typography>
        <Typography variant="body2"> {data.user.lastname}</Typography>
      </CardContent>
    </Card>
  );
}
