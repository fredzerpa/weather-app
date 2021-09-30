import React from 'react';

// CSS
import './App.css';

// * Libraries
// + Material-UI
import { Grid, makeStyles } from '@material-ui/core';

// * Components
import ForecastCardsOverview from './components/forecast-cards-overview/forecast-cards-overview.component';
import GithubCorner from 'react-github-corner';
import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    minHeight: '100vh',
    background: `#181818`,
  },
  githubCorner: {
    [theme.breakpoints.down('xs')]: {
      // Not shown on small devices
      display: 'none',
    },
  },
}));

const App = () => {
  // -- Material Style
  const classes = useStyles();
  return (
    <Grid
      className={classes.root}
      container
      direction='column'
      justifyContent='center'
    >
      <Header />
      <ForecastCardsOverview />
      <GithubCorner
        className={classes.githubCorner}
        bannerColor='#fff'
        octoColor='#000'
        href={process.env.REACT_APP_GITHUB_ACCOUNT}
      />
      <Footer />
    </Grid>
  );
};

export default App;
