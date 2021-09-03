import React, { useState } from 'react';

// * Libraries
// + Material-UI Components
import {
  Container,
  TextField,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
// + Material-UI Colors
import { red } from '@material-ui/core/colors';
// + Material-UI Icons Library
import { SearchOutlined, LocationOn } from '@material-ui/icons';

// * Configs
// + Weather API custom config
import { getForecast } from '../../config/API/open-weather/open-weather.api';

const useStyles = makeStyles({
  searchbar: {
    padding: '1rem 0',
    width: '100%',
    'border-radius': '2rem',
    '& > *': {
      background: 'white',
      'border-radius': 'inherit',
      '& *:-webkit-autofill': {
        // input default border-radius overwrite
        // as it overlaps with the previous border-radius
        'border-radius': '0',
      },
    },
  },
  locationIcon: {
    color: red[700],
  },
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

const getUserGeoLocation = async () => {
  // ! Is promise function which will return the userLocation
  if (!('geolocation' in navigator)) {
    return 'Geolocation is not available on this device';
  }
  const askUserLocation = () =>
    // * It's a promise so we can get the value in other sections of the code
    new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej);
    });
  const userLocation = await askUserLocation();
  return userLocation;
};

const SearchBar = ({ setGeoLocation }) => {
  const classes = useStyles();
  const [cityToSearch, setCityToSearch] = useState('');
  return (
    <Container maxWidth='sm'>
      <TextField
        className={classes.searchbar}
        id='searchbar'
        type='search'
        placeholder='Search by city'
        variant='outlined'
        onChange={e => setCityToSearch(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter')
            getForecast.fiveDaysThreeHours
              .byCity(cityToSearch.toLowerCase())
              .then(setGeoLocation)
              .catch(err => console.log(err.response));
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start' disablePointerEvents>
              {/* Search Icon - Button Less */}
              <SearchOutlined />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
              {/* Location Icon */}
              <IconButton
                onClick={() =>
                  getUserGeoLocation().then(
                    ({ coords: { latitude: lat, longitude: lon } }) =>
                      getForecast.fiveDaysThreeHours
                        .byCoords({ lat, lon })
                        .then(setGeoLocation)
                        .catch(console.error)
                  )
                }
              >
                <LocationOn className={classes.locationIcon} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Container>
  );
};

export default SearchBar;
