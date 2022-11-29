import React, { useState, useEffect, useRef } from 'react';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Grid } from '@mui/material';

export default function SlickContainer({ data }) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: 'center',
  };

  return (
    <div>
      <Slider {...settings}>
        {data.map((card, index) => (
          <Grid alignItems="center">
            <div key={index}>
              <img src={card.url} width="250" height="250" />
            </div>
          </Grid>
        ))}
      </Slider>
    </div>
  );
}
