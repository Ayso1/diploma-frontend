import {
  Typography,
  CardHeader,
  Card,
  CardContent,
  CardMedia,
  Paper,
} from '@mui/material';

import React, { Component, FC, useState } from 'react';

export default function SinglePost({ data }) {
  console.log(data);
  return (
    <Card sx={{ width: 330, height: 340 }}>
      <CardHeader title={data.title} subheader={data.categoryName} />
      <CardMedia component="img" height="200px" image={data.photos[0].url} />
      <CardContent>
        <Typography
          variant="body2"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          {data.descriptions}
        </Typography>
      </CardContent>
    </Card>
  );
}
