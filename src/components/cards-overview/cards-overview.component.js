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
    marginLeft: 0,
    marginRight: 0,
  },
});

const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

const CardsOverview = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={2}
      justifyContent='center'
      className={classes.container}
    >
      {weekdays.map((day, i) => (
        <Grid key={i} item xs={12} sm={4} lg={2}>
          <ForecastCard day={day} codeOpenWeatherImage={'10d'} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CardsOverview;
