import React from 'react';

// * Libraries
// + Material-UI
import { Container, makeStyles } from '@material-ui/core';

// * Components
import AutocompleteSearchbar from '../autocomplete-searchbar/autocomplete-searchbar.component';

const useStyles = makeStyles(theme => ({
  container: {
    background: '#3a3a3a',
    boxShadow:
      '0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)',
    marginBottom: '2rem',
  },
}));

const Header = props => {
  const classes = useStyles();
  return (
    <Container className={classes.container} maxWidth={false}>
      <AutocompleteSearchbar {...props} />
    </Container>
  );
};

export default React.memo(Header);
