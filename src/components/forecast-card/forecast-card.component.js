import React, { useEffect } from 'react';

// * Libraries
// + Material-UI Library
import Collapse from '@mui/material/Collapse'; // Material-UI v5
import {
  makeStyles,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Paper,
  Hidden,
  Typography,
  IconButton,
  CardActions,
} from '@material-ui/core'; // Material-UI v4
// + Material-UI Icons
import {
  Close,
  ExpandMore,
  Favorite,
  FavoriteBorder,
} from '@material-ui/icons';
// + CLSX for Classes Construct
import clsx from 'clsx';
// + MomentJs
import moment from 'moment';

// * API
// + Unsplash
import { searchPhotosByKeyword } from '../../API/unsplash/unsplash.api';
import TimelineCarousel from '../timeline-carousel/timeline-carousel.component';
import WeatherTimeline from '../weather-timeline/weather-timeline.component';

// * Utils
// + Functions
import {
  capitalizeFirstLetter,
  convertFarenheitToCelcius,
  getRandomNumber,
} from '../../utils/functions.utils';
import {
  getForecast,
  getWeatherConditionIcon,
} from '../../API/open-weather/open-weather.api';
import { connect } from 'react-redux';
import {
  addAddressToFavorites,
  removeAddress,
  removeAddressFromFavorites,
} from '../../redux/address/address.actions';

// -- Material-UI Styles
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '375px',
    maxHeight: '250px',
    padding: '0', // Better aesthetic on mobiles
    margin: '1rem 0',

    // Breakpoints
    [theme.breakpoints.up('md')]: {
      paddingLeft: '.5rem',
      paddingRight: '.5rem',
    },
  },
  card: ({ cardBgUrl }) => ({
    display: 'flex',
    flexFlow: 'column wrap',
    width: '100%',
    height: '100%',
    position: 'relative',
    zIndex: '2', // Be higher layered than moreData
    // Image API Background
    backgroundPosition: 'center',
    backgroundImage: `url(${cardBgUrl})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  }),
  cardOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: '-1', // So it goes behind its adyacent elements
  },
  cardTitle: {
    color: 'white',
    fontSize: '1.75rem',
    display: 'flex',
    alignItems: 'center',
  },
  cardSubtitle: {
    color: '#d6dbdc',
  },
  cardHeaderAction: {
    height: '100%',
    marginRight: '-5px',
  },
  favoriteButton: {
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration,
    }),

    padding: '8px',
  },
  closeButton: {
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration,
    }),

    padding: '8px',
  },
  cardContent: {},
  cardActions: {
    marginTop: 'auto',
    padding: '8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardActionsTitle: {
    color: 'whitesmoke',
    fontWeight: '300',
    fontSize: '1.25rem',
  },
  cardActionsIcon: {
    marginRight: '-8px',
  },
  expand: {
    transform: 'rotate(270deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(90deg)',
  },
  collapse: {
    // Utilizing MUI Grid classes instead of a Grid for a better Transition UX
    [theme.breakpoints.up('xs')]: {
      maxWidth: '50%',
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: 'calc(5*100%/12)',
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: '50%',
    },
    // [theme.breakpoints.up('md')]: {
    //   maxWidth: '50%',
    // },
  },
  collapseWrapperInner: {
    maxWidth: '100%',
  },
  moreData: {
    backgroundColor: 'ghostwhite',
    // backgroundColor: '#f1f1ff',
    // Structure
    width: 'calc(100% + 20px)', // 20px from margin left
    height: 'calc(100% - 8px)', // 8px from margin top & bottom
    padding: 'calc(1rem - 8px) 1rem calc(1rem - 8px) calc(1rem + 20px)', // 8px from magin top-bot & 20px  from the margin left
    margin: '4px 0 4px -20px', // Acentuation to the main data
    zIndex: '1', // Go behind mainData

    // Layout
    display: 'flex',
    flexFlow: 'column wrap',
  },
  moreDataLeftSide: {},
  moreDataRightSide: {
    height: '100%',
    [theme.breakpoints.down('xs')]: {
      alignItems: 'center',
    },
  },
  timelineCarousel: {
    marginTop: 'auto',
  },
}));

const ForecastCard = ({
  address,
  favorite = false,
  addAddressToFavorites,
  removeAddressFromFavorites,
  removeAddress,
}) => {
  const [forecast, setForecast] = React.useState(undefined);
  const [expanded, setExpanded] = React.useState(true);
  const [cardBgUrl, setCardBgUrl] = React.useState('');
  const [isFavorite, setIsFavorite] = React.useState(favorite);
  const todayForecast = React.useRef(undefined);

  // ! Important: remember passing Object as props for useStyles
  const classes = useStyles({ cardBgUrl }); // Passing the url to Material Styles

  console.log('render', isFavorite);

  useEffect(() => {
    // Gets data from Open Weather API using a City as the query
    getForecast.fiveDaysThreeHours.byCity(address.city).then(data => {
      // Get today or tomorrow forecast at noon
      todayForecast.current =
        data.results.list.filter(
          data =>
            moment(data.dt_txt).calendar(null, {
              sameDay: '[Today]',
              nextDay: '[Tomorrow]',
              nextWeek: 'dddd',
              lastDay: '[Yesterday]',
              lastWeek: '[Last] dddd',
              sameElse: 'DD/MM/YYYY',
            }) === 'Today' && moment(data.dt_txt).get('hour') === 12
        )[0] ??
        data.results.list.filter(
          data =>
            moment(data.dt_txt).calendar(null, {
              sameDay: '[Today]',
              nextDay: '[Tomorrow]',
              nextWeek: 'dddd',
              lastDay: '[Yesterday]',
              lastWeek: '[Last] dddd',
              sameElse: 'DD/MM/YYYY',
            }) === 'Tomorrow' && moment(data.dt_txt).get('hour') === 12
        )[0];
      setForecast(data);
    });

    // Gets data from Unsplash API using a City as the query
    searchPhotosByKeyword(address.city, {
      backupSearch: true,
      backupKeyword:
        address.country.length > 3 ? address.country : address.country_name,
    }).then(({ response: { data } }) => {
      const imageUrls =
        data.results[getRandomNumber(data.results.length)]?.urls;
      setCardBgUrl(imageUrls?.small);
    });
  }, [address]);

  // -- Click Handlers
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);

    if (!isFavorite) {
      addAddressToFavorites(address);
    } else {
      removeAddressFromFavorites(address);
    }
  };

  // const fullDate = new Date(data.dt_txt);
  return forecast && todayForecast ? (
    <Grid
      wrap='nowrap'
      container
      justifyContent='center'
      className={classes.root}
    >
      {/* Main Data Container */}
      <Grid container item xs={10} sm={5} md={6}>
        <Card className={classes.card} raised>
          {/* Overlay */}
          <div className={classes.cardOverlay}></div>
          {/* Header */}
          <CardHeader
            classes={{
              action: classes.cardHeaderAction,
            }}
            action={
              <Grid
                container
                justifyContent='center'
                // alignItems='flex-start'
                direction='column'
                wrap='nowrap'
              >
                <IconButton
                  aria-label='Toggle from favorite'
                  onClick={handleFavoriteClick}
                  className={classes.favoriteButton}
                >
                  {isFavorite ? (
                    <Favorite style={{ color: 'white' }} />
                  ) : (
                    <FavoriteBorder style={{ color: 'white' }} />
                  )}
                </IconButton>
                <IconButton
                  aria-label='Toggle from favorite'
                  onClick={() => removeAddress(address)}
                  className={classes.closeButton}
                >
                  <Close style={{ color: 'white' }} />
                </IconButton>
              </Grid>
            }
            title={todayForecast.current.weather[0].main}
            titleTypographyProps={{
              variant: 'h2',
              component: 'h3',
              className: classes.cardTitle,
            }}
            subheader={moment(todayForecast.current.dt_txt).format(
              'DD/MM/YYYY'
            )}
            subheaderTypographyProps={{
              variant: 'subtitle2',
              className: classes.cardSubtitle,
            }}
          />

          {/* Body */}
          <CardContent className={classes.cardContent}></CardContent>
          {/* Footer */}
          <CardActions className={classes.cardActions}>
            <Typography
              variant='body1'
              className={classes.cardActionsTitle}
              noWrap
              align='left'
            >
              {capitalizeFirstLetter(address.city.toLowerCase())},{' '}
              {capitalizeFirstLetter(address.country_code.toLowerCase())}
            </Typography>
            <IconButton
              className={`${clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })} ${classes.cardActionsIcon}`}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label='show more'
            >
              <ExpandMore style={{ color: 'white' }} />
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
      {/* More Data Container */}
      <Collapse
        in={expanded}
        timeout='auto'
        orientation='horizontal'
        unmountOnExit
        // Utilizing MUI Grid classes instead of a Grid for a better Transition UX
        className={classes.collapse}
        classes={{
          wrapperInner: classes.collapseWrapperInner,
        }}
      >
        <Paper className={classes.moreData} elevation={3}>
          {/* Data */}
          <Grid
            container
            justifyContent='space-evenly'
            alignItems='center'
            style={{ height: 'calc(100% - 110px)' }}
          >
            {/* Left */}
            <Hidden xsDown>
              <Grid
                container
                item
                sm={7}
                justifyContent='center'
                style={{
                  height: '100%',
                }}
              >
                <img
                  src={getWeatherConditionIcon(
                    todayForecast.current.weather[0].main,
                    todayForecast.current.weather[0].id,
                    todayForecast.current.dt_txt
                  )}
                  height='150px'
                  width='150px'
                  alt='weather icon'
                  style={{
                    marginTop: '-20px',
                  }}
                />
              </Grid>
            </Hidden>
            {/* Right */}
            <Grid
              container
              item
              xs={12}
              sm={5}
              direction='column'
              justifyContent='center'
              className={classes.moreDataRightSide}
            >
              <Typography align='justify' variant='body2' noWrap>
                {Math.round(
                  convertFarenheitToCelcius(todayForecast.current.main.temp)
                )}
                ℃ | {Math.round(todayForecast.current.main.temp)}℉
              </Typography>
              <Typography align='justify' variant='body2' noWrap>
                Feels like: {Math.round(todayForecast.current.main.feels_like)}
                °F
              </Typography>
              <Typography align='justify' variant='body2' noWrap>
                Wind: {todayForecast.current.wind.speed} mph
              </Typography>
              <Typography align='justify' variant='body2' noWrap>
                Humidity: {todayForecast.current.main.humidity}%
              </Typography>
            </Grid>
          </Grid>

          {/* Carousel */}
          <TimelineCarousel className={classes.timelineCarousel} height='110px'>
            {forecast.results.list.map((value, i) => (
              <WeatherTimeline key={i} data={value} />
            ))}
          </TimelineCarousel>
        </Paper>
      </Collapse>
    </Grid>
  ) : null;
};

const mapDispatchToProps = dispatch => ({
  addAddressToFavorites: address => dispatch(addAddressToFavorites(address)),
  removeAddressFromFavorites: address =>
    dispatch(removeAddressFromFavorites(address)),
  removeAddress: address => dispatch(removeAddress(address)),
});

export default React.memo(connect(null, mapDispatchToProps)(ForecastCard));
