import React from 'react';

// * Material-UI Library
// + Material-UI Components
import {
  Container,
  TextField,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
// + Material-UI Icons Library
import { SearchOutlined, LocationOn } from '@material-ui/icons';
// + Material-UI Colors
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles({
  searchbar: {
    padding: '1rem 0',
    width: '100%',
    'font-size': '1.2rem',
    'border-radius': '2rem',
    margin: '5rem 0',
    '& > *': {
      background: 'whitesmoke',
      'border-radius': 'inherit',
    },
  },
  locationIcon: {
    color: red[700],
  },
});

const getUserLocation = async () => {
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

const handleLocationSearch = e => {
  
}

const SearchBar = ({ setLocation }) => {
  const classes = useStyles();
  return (
    <Container maxWidth='sm'>
      <TextField
        className={classes.searchbar}
        id='searchbar'
        type='search'
        placeholder='Search a location'
        variant='outlined'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start' disablePointerEvents>
              <SearchOutlined />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                aria-label='search my location'
                color='secondary'
                onClick={() => getUserLocation().then(setLocation)}
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
