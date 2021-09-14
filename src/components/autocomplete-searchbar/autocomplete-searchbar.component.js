import React from 'react';

// * Libraries
// + Material-UI
import { Grid, Typography, makeStyles } from '@material-ui/core';
// + Material-UI Lab
import { Autocomplete } from '@material-ui/lab';
// + Material-UI Icons
import { LocationOn } from '@material-ui/icons';
// + Autosuggest Highlight
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
// + Axios
import axios from 'axios';
// * Components
// + API
import { autocompleteAddress } from '../../config/API/geoapify/geoapify.api';
// + Utils
import SearchBar from '../searchbar/searchbar.component';

// -- Material Styles
const useStyles = makeStyles(theme => ({
  optionsIcon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
  optionsWrapper: {
    borderRadius: '1rem!important',
  },
}));

const AutocompleteSearchbar = () => {
  // Data from API
  const [value, setValue] = React.useState(null);
  // Data from Input
  const [inputValue, setInputValue] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0 && inputValue.length >= 3;
  const fetchOptionsCancelToken = React.useRef(undefined);

  // -- Material Styles Instance
  const classes = useStyles();

  const fetchOptions = React.useMemo(
    () => cityName => {
      // -- Axios Cancelling - cancel previous unfinished requests

      // Check if there are any previous pending requests
      if (typeof fetchOptionsCancelToken.current != typeof undefined) {
        fetchOptionsCancelToken.current.cancel(
          'Operation canceled due to new request.'
        );
      }

      // Save the cancel token for the current request
      fetchOptionsCancelToken.current = axios.CancelToken.source();

      return autocompleteAddress.byCity(
        cityName,
        fetchOptionsCancelToken.current
      );
    },
    []
  );

  React.useEffect(() => {
    let active = true;

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetchOptions(inputValue).then(({ results }) => {
      if (active) {
        let newOptions = [];
        console.log(results);

        if (value) {
          newOptions = [value];
        }

        if (results.data.features) {
          newOptions = [...newOptions, ...results.data.features];
        }

        setOptions(newOptions);
      }
    });

    // Stops memory leak
    return () => {
      active = false;
    };
  }, [value, inputValue, fetchOptions]);

  return (
    <Autocomplete
      id='city-searchbar'
      popupIcon={null}
      value={value}
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionLabel={option =>
        `${option.properties.city}, ${
          option.properties.state
        }, ${option.properties.country_code.toUpperCase()}`
      }
      options={options}
      loading={loading}
      classes={{
        paper: classes.optionsWrapper,
      }}
      renderInput={params => <SearchBar {...params} />}
      renderOption={option => {
        const optionCustomAddress =
          option.properties.city +
          ', ' +
          option.properties.state +
          ', ' +
          option.properties.country_code.toUpperCase();
        const matches = match(optionCustomAddress, inputValue);
        const parts = parse(optionCustomAddress, matches);
        return (
          <Grid container alignItems='center'>
            <Grid item>
              <LocationOn className={classes.optionsIcon} />
            </Grid>
            <Grid item xs>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{ fontWeight: part.highlight ? 700 : 400 }}
                >
                  {part.text}
                </span>
              ))}

              <Typography variant='body2' color='textSecondary'>
                {option.properties.formatted}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
};

export default AutocompleteSearchbar;
