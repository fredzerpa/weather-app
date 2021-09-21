import React from 'react';

// * Libraries
// + Material-UI
import { Grid, makeStyles } from '@material-ui/core';

// * Components
import ForecastCard from '../forecast-card/forecast-card.component';

// -- Material-UI Styles
const useStyles = makeStyles({
  container: {
    maxWidth: '100%', // So it doesn't overflow,
    // Overriding Material default style for grid
    margin: '0 0 2rem',
  },
});

const WEATHER_ICONS_MATCH = {
  // -- Group 2xx: Thunderstorm
  Thunderstorm: {
    211: null, // Thunderstorm without Rain
    default: null,
  },
  // -- Group 3xx: Drizzle
  Drizzle: {
    default: null,
  },
  // -- Group 5xx: Rain
  Rain: {
    default: null,
  },
  // -- Group 6xx: Snow
  Snow: {
    default: null,
  },
  // -- Group 7xx: Atmosphere
  Atmosphere: {
    default: null,
  },
  // -- Group 800: Clear
  Clear: {
    800: {
      // Clear
      day: null,
      night: null,
    },
    default: null,
  },
  // -- Group 80x: Clouds
  Clouds: {
    801: {
      // Few clouds
      day: null,
      night: null,
    },
    default: null,
  },
};

const ForecastCardsOverview = ({ addressData }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={2}
      justifyContent='center'
      alignItems='center'
      className={classes.container}
    >
      {/* Wrapper for the Cards. Should use one per Card  */}
      <Grid container item xs={12} md={6} lg={5} justifyContent='center'>
        <ForecastCard addressData={addressData} />
      </Grid>
      <Grid container item xs={12} md={6} lg={5} justifyContent='center'>
        <ForecastCard addressData={addressData} />
      </Grid>
      <Grid container item xs={12} md={6} lg={5} justifyContent='center'>
        <ForecastCard addressData={addressData} />
      </Grid>
    </Grid>
  );
};

export default ForecastCardsOverview;
