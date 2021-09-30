import React from 'react';

// * Libraries
// + Material-UI
import { Grid, makeStyles } from '@material-ui/core';
// + React~Redux
import { connect } from 'react-redux';
// + Reselect
import { createStructuredSelector } from 'reselect';
import {
  selectSearchedAddresses,
} from '../../redux/address/address.selectors';

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

const ForecastCardsOverview = ({ searchedAddresses }) => {
  const classes = useStyles();

  return searchedAddresses.length ? (
    <Grid
      container
      spacing={2}
      justifyContent='center'
      alignItems='center'
      className={classes.container}
    >
      {/* Wrapper for the Cards. Should use one per Card  */}
      {searchedAddresses.map((address, idx) => (
        <Grid
          key={address.place_id ?? idx}
          container
          item
          xs={12}
          md={6}
          lg={5}
          justifyContent='center'
        >
          <ForecastCard address={address} />
        </Grid>
      ))}
    </Grid>
  ) : null;
};

const mapStateToProps = createStructuredSelector({
  searchedAddresses: selectSearchedAddresses,
});

export default connect(mapStateToProps)(ForecastCardsOverview);
