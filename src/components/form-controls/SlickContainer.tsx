import React, { useState, useEffect, useRef } from 'react';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Grid } from '@mui/material';
import { StylesContext } from '@mui/styles';
import styles from '../../../styles/slick.module.css';

export default function SlickContainer({ data }) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: 'center',
  };

  return (
    <div className={styles.container}>
      <Slider {...settings}>
        {data.map((card, index) => (
          <Grid alignItems="center">
            <div key={index}>
              <img className={styles.img} src={card.url} />
            </div>
          </Grid>
        ))}
      </Slider>
    </div>
  );
}
