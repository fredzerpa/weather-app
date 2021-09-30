import React from 'react';

// * Libraries
// + Material-UI
import { Container, Link, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: 'auto',
    background: '#3a3a3a',
    height: '70px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow:
      '0px -3px 3px -2px rgb(0 0 0 / 20%), 0px -3px 4px 0px rgb(0 0 0 / 14%), 0px -1px 8px 0px rgb(0 0 0 / 12%)',
  },
  typography: {
    color: 'white',
    fontSize: '1rem',
  },
  heartIcon: {
    color: 'red',
  },
}));

const Footer = props => {
  const classes = useStyles();
  return (
    <Container className={classes.container} maxWidth={false}>
      <Typography align='center' variant='h4' className={classes.typography}>
        Made with <span className={classes.heartIcon}>❤</span> by{' '}
        <Link
          color='inherit'
          href={process.env.REACT_APP_GITHUB_ACCOUNT}
          target='_blank'
          rel='noopener'
        >
          Fred Zerpa
        </Link>
      </Typography>
    </Container>
  );
};

export default React.memo(Footer);
