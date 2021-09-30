import React from 'react';

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
// + Axios
import axios from 'axios';

// + Redux
import { connect } from 'react-redux';
import { addAddress } from '../../redux/address/address.actions';

const useStyles = makeStyles({
  searchbar: {
    padding: '1rem 0',
    width: '100%',
    'border-radius': '1.75rem',
    '& > *': {
      background: 'white',
      padding: '9px!important', // Overrides inputRoot padding
      'border-radius': 'inherit',
    },

    // ! Remove Default X icon from Google Chrome
    '& input[type="search"]::-webkit-search-decoration': {
      display: 'none',
    },
    '& input[type="search"]::-webkit-search-cancel-button': {
      display: 'none',
    },
    '& input[type="search"]::-webkit-search-results-button': {
      display: 'none',
    },
    '& input[type="search"]::-webkit-search-results-decoration': {
      display: 'none',
    },
  },
  locationIcon: {
    color: red[700],
  },
});

const getUserGeoLocation = async () => {
  // ! Is promise function which will return the userLocation
  // if (!('geolocation' in navigator)) {
  //   return 'Geolocation is not available on this device';
  // }
  // const askUserLocation = () =>
  // // * It's a promise so we can get the value in other sections of the code
  //   new Promise((res, rej) => {
  //     navigator.geolocation.getCurrentPosition(res, rej);
  //   });
  // const userLocation = await askUserLocation();
  // return userLocation;

  // More data than navigator
  return await axios.get('https://ipapi.co/json');
};

const SearchBar = ({ addAddress, ...props }) => {
  const classes = useStyles();

  return (
    <Container maxWidth='sm'>
      <TextField
        {...props}
        className={classes.searchbar}
        id='searchbar'
        type='search'
        placeholder='Search by city'
        variant='outlined'
        inputProps={{
          ...props.inputProps,
          autoComplete: 'off',
        }}
        InputProps={{
          ...props.InputProps,
          startAdornment: (
            <InputAdornment
              position='end'
              disablePointerEvents
              style={{ margin: '0 .75rem' }}
            >
              {/* Search Icon - Button Less */}
              <SearchOutlined />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
              {/* Get Icons from Material Autocomplete Library */}
              {props?.InputProps?.endAdornment?.props?.children}

              {/* Location Icon */}
              <IconButton
                onClick={() =>
                  getUserGeoLocation().then(({ data }) => addAddress(data))
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

const mapDispatchToProps = dispatch => ({
  addAddress: data => dispatch(addAddress(data)),
});

export default React.memo(connect(null, mapDispatchToProps)(SearchBar));
