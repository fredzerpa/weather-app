import React from 'react';

// * Libraries
// + Github Corner Library
import GithubCorner from 'react-github-corner';
// + Material-UI Components
import { Box, makeStyles } from '@material-ui/core';

// * Material-UI Style Config
const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      // Not shown on small devices
      display: 'none',
    },
  },
}));

const GithubSticker = ({ link }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <GithubCorner href={link} />
    </Box>
  );
};

export default GithubSticker;
