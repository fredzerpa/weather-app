import React, { useState } from 'react';

// CSS
import './App.css';

// * Libraries
// + Material-UI
import { makeStyles } from '@material-ui/core';

// * Components
import SearchBar from './components/searchbar/searchbar.component';
import CardsOverview from './components/cards-overview/cards-overview.component';
import GithubSticker from './components/github-sticker/github-sticker.component';

import background from './assets/weather-backgrounds/snow-mountains.jpg';

const useStyles = makeStyles({
  root: {
    width: '100vw',
    height: '100vh',
    background:
      `#000000 url(${background}) no-repeat center center`,
    backgroundSize: 'cover',
    overflowY: 'auto',
  },
});

const App = () => {
  const [city, setCity] = useState('');
  const [geoLocation, setGeoLocation] = useState(null);
  const [weather, setWeather] = useState(null);

  // -- Material Style
  const classes = useStyles();
  
  console.log(geoLocation);

  return (
    <div className={classes.root}>
      <SearchBar setGeoLocation={setGeoLocation} />
      <CardsOverview geoLocation={geoLocation}/>
      <GithubSticker link={process.env.REACT_APP_GITHUB_ACCOUNT} />
    </div>
  );
};

export default App;
