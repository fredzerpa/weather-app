import React from 'react';

// * Libraries
// + Material-UI
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';

// + MomentJs
import moment from 'moment';

// * Config
// + Utils
import { convertFarenheitToCelcius } from '../../utils/functions.utils';
import { getWeatherConditionIcon } from '../../API/open-weather/open-weather.api';

const useStyles = makeStyles(theme => ({
  card: {
    // padding: theme.spacing(1),
    borderRadius: '0',
    width: '85px',
    height: '100%',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    // Transparent bg
    backgroundColor: 'rgba(255,255,255,0)',
  },
  cardHeader: {
    padding: '0',
  },
  cardHeaderTitle: {
    fontSize: '.8rem',
    fontWeight: 'bold',
  },
  cardMedia: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100% - 45px)', // 45px from the Card Content Height
    width: '100%',
  },
  cardContent: {
    padding: '8px',
    height: '45px',
    // Override CSS
    '&:last-child': {
      paddingTop: '0',
      paddingBottom: '0',
    },
  },
  cardContentTypography: {
    fontSize: '0.7rem',
  },
}));

const WeatherTimeline = ({ data, className, ...otherProps }) => {
  const classes = useStyles();

  const date = new Date(data.dt_txt);

  return (
    <Card className={`${classes.card} ${className ?? ''}`} {...otherProps}>
      {/* Card Header */}
      <CardHeader
        title={moment(date).calendar(null, {
          sameDay: '[Today]',
          nextDay: '[Tomorrow]',
          nextWeek: 'dddd',
          lastDay: '[Yesterday]',
          lastWeek: '[Last] dddd',
          sameElse: 'DD/MM/YYYY',
        })}
        classes={{
          title: classes.cardHeaderTitle,
        }}
        className={classes.cardHeader}
      />
      {/* Card Image */}
      <CardMedia
        className={classes.cardMedia}
        alt='img'
        image={`${window.location.origin}${getWeatherConditionIcon(
          data.weather[0].main,
          data.weather[0].id,
          data.dt_txt
        )}`}
      />
      {/* Card Body */}
      <CardContent className={classes.cardContent}>
        <Grid
          container
          direction='column'
          justifyContent='flex-end'
          alignItems='center'
          style={{ height: '100%' }}
        >
          <Typography
            align='center'
            variant='button'
            className={classes.cardContentTypography}
          >
            {moment(date).format('h:mm a')}
          </Typography>
          <Typography
            align='center'
            variant='button'
            className={classes.cardContentTypography}
            noWrap
          >
            {Math.round(convertFarenheitToCelcius(data.main.temp))}℃ |{' '}
            {Math.round(data.main.temp)}℉
          </Typography>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WeatherTimeline;
