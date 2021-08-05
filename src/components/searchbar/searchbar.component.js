import React from 'react';

// * Libraries
// + Material-UI Components
import { Container, TextField, InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
// + Material-UI Colors
import { red } from '@material-ui/core/colors';
// + Material-UI Icons Library
import { SearchOutlined, LocationOn, LocationOff } from '@material-ui/icons';
// + Custom Library to Animate Toggling Icons
import ToggleIcons from '../toggle-icons/toggle-icons.components';

const useStyles = makeStyles({
  searchbar: {
    padding: '1rem 0',
    width: '100%',
    // 'font-size': '1.2rem',
    'border-radius': '2rem',
    margin: '3rem 0',
    '& > *': {
      background: 'white',
      'border-radius': 'inherit',
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
  alert('hola');
};

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
              <ToggleIcons
                defaultComponentIcon={<LocationOff />}
                toggleComponentIcon={<LocationOn />}
                className={classes.locationIcon}
                onDefaultComponentClick={() =>
                  getUserLocation().then(setLocation)
                }
                onToggleComponentClick={() => console.log('undone location')}
              />
            </InputAdornment>
          ),
        }}
      />
    </Container>
  );
};

export default SearchBar;
