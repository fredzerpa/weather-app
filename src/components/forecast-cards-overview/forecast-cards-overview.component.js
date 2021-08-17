import React from 'react';

// * Libraries
// + Material-UI
import { Grid, makeStyles } from '@material-ui/core';

// * Components
import ForecastCard from '../forecast-card/forecast-card.component';
// + Icons
import {
  ClearNight,
  Cloudy,
  CloudyWithLightning,
  CloudyWithMoon,
  CloudyWithRainAndLightning,
  CloudyWithSun,
  Rainy,
  Snowy,
  Sunny,
  SunnyWithWind,
} from '../weather-icons/weather-icons.component';

// -- Material-UI Styles
const useStyles = makeStyles({
  container: {
    maxWidth: '100%', // So it doesn't overflow,
    // Overriding Material default style for grid
    marginLeft: 0,
    marginRight: 0,
  },
});

const WEATHER_ICONS_MATCH = {
  // -- Group 2xx: Thunderstorm
  Thunderstorm: {
    211: <CloudyWithLightning />, // Thunderstorm without Rain
    default: <CloudyWithRainAndLightning width='150' />,
  },
  // -- Group 3xx: Drizzle
  Drizzle: {
    default: <Rainy width='150' />,
  },
  // -- Group 5xx: Rain
  Rain: {
    default: <Rainy width='150' />,
  },
  // -- Group 6xx: Snow
  Snow: {
    default: <Snowy width='150' />,
  },
  // -- Group 7xx: Atmosphere
  Atmosphere: {
    default: null,
  },
  // -- Group 800: Clear
  Clear: {
    800: {
      // Clear
      day: <Sunny width='150' />,
      night: <ClearNight width='150' />,
    },
    default: <Sunny width='150' />,
  },
  // -- Group 80x: Clouds
  Clouds: {
    801: {
      // Few clouds
      day: <CloudyWithSun width='150' />,
      night: <CloudyWithMoon width='150' />,
    },
    default: <Cloudy width='150' />,
  },
};

const CardsOverview = ({ geoLocation: { data } }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={2}
      justifyContent='center'
      className={classes.container}
    >
      {data?.list
        ?.filter(forecast => new Date(forecast.dt_txt).getHours() === 12)
        .map((forecast, i) => {
          const weather = forecast.weather[0];
          const weatherCondition = weather.main;
          const weatherCode = weather.id;
          const weatherTime =
            6 <= new Date(forecast.dt_txt).getHours() <= 18 ? 'day' : 'night';

          return (
            <Grid key={i} item xs={6} sm={4} lg={2}>
              <ForecastCard
                data={forecast}
                icon={
                  // If there's no Icon Code then display default
                  // Taking into account if it's day or night time
                  // ! the order is important
                  WEATHER_ICONS_MATCH[weatherCondition]?.[weatherCode]?.[
                    weatherTime
                  ] ??
                  WEATHER_ICONS_MATCH[weatherCondition]?.[weatherCode] ??
                  WEATHER_ICONS_MATCH[weatherCondition].default
                }
              />
            </Grid>
          );
        })}
    </Grid>
  );
};

export default CardsOverview;
