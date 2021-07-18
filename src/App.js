import React, { useState } from 'react';

// CSS
import './App.css';

// * Components
import GithubSticker from './components/github-sticker/github-sticker.component';
import SearchBar from './components/searchbar/searchbar.component';
import ForecastCard from './components/forecast-card/forecast-card.component';

// * Configs
// + Weather API custom config
import { getForecast } from './config/API/weather-api.config';

const App = () => {
  const [location, setLocation] = useState('');

  if (!!location) {
    getForecast.fiveDaysThreeHours(location).then(setLocation);
  }

  console.log(location);

  return (
    <div className='App'>
      <SearchBar
        setLocation={setLocation}
      />
      <ForecastCard />
      <GithubSticker link={process.env.REACT_APP_GITHUB_ACCOUNT} />
    </div>
  );
};

export default App;
