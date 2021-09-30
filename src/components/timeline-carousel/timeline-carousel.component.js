import React from 'react';

// * Libraries
// + Swiper Carousel
import { Swiper, SwiperSlide } from 'swiper/react';
// + Material-UI
import { makeStyles } from '@material-ui/core';

// Import Swiper styles
import 'swiper/swiper.min.css';

const useStyles = makeStyles({
  swiper: {
    width: '100%',
    maxWidth: '100%',
    '&:hover': {
      cursor: 'grab',
    },
    '&:active': {
      cursor: 'grabbing',
    },
    // Transparent Bg
    backgroundColor: 'rgba(255,255,255,0)',
  },
  slide: {
    // Original CSS
    textAlign: 'center',
    fontSize: '18px',

    /* Center slide text vertically */
    display: 'flex',
    '-webkit-box-pack': 'center',
    '-ms-flex-pack': 'center',
    '-webkit-justify-content': 'center',
    justifyContent: 'center',
    '-webkit-box-align': 'center',
    '-ms-flex-align': 'center',
    '-webkit-align-items': 'center',
    alignItems: 'center',

    // Custom CSS
    width: 'auto',
  },
});

const TimelineCarousel = ({
  children,
  height = '100px',
  className,
  ...props
}) => {
  const classes = useStyles();
  return (
    <Swiper
      className={`${classes.swiper} ${className}`}
      slidesPerView={'auto'}
      style={{ height }}
      {...props}
    >
      {children.map((child, i) => (
        <SwiperSlide key={i} className={classes.slide}>
          {child}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TimelineCarousel;
