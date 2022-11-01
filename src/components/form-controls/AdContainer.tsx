import de from 'date-fns/esm/locale/de/index.js';
import {
  Typography,
  Paper,
  Box,
  CardHeader,
  Card,
  IconButton,
  CardContent,
  CardMedia,
  ButtonBase,
} from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import React, { Component, FC, useState } from 'react';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { ControllerRenderProps } from 'react-hook-form';
import MoreVertIcon from '@material-ui/icons/MoreVert';

interface Props {
  title: string;
  categoryName: string;
  firstName: string;
  lastname: string;
  description: string;
  photo: string;
  alignGridItems?: 'flex-start' | 'flex-end';
}

export default function SinglePost({ data }) {
  console.log(data.photos);
  //let result = a.map((photoUrl) => photoUrl.url);
  //console.log(data.photos);

  return (
    <Card sx={{ width: 300, height: 300 }}>
      <CardHeader title={data.title} subheader={data.categoryName} />
      <CardMedia component="img" height="150px" image="1" />
      <CardContent>
        <Typography variant="body2">{data.descriptions}</Typography>
        <Typography variant="body2">{data.user.firstName}</Typography>
        <Typography variant="body2"> {data.user.lastname}</Typography>
      </CardContent>
      <ButtonBase
        onClick={(event) => {
          alert('Hello from here');
        }}
      ></ButtonBase>
    </Card>
  );
}
