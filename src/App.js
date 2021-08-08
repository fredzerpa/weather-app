import React, { useState } from 'react';

// CSS
import './App.scss';

// * Components
import SearchBar from './components/searchbar/searchbar.component';
import CardsOverview from './components/cards-overview/cards-overview.component';
import GithubSticker from './components/github-sticker/github-sticker.component';

const App = () => {
  const [city, setCity] = useState('');
  const [geoLocation, setGeoLocation] = useState(null);
  const [weather, setWeather] = useState(null);

  console.log(geoLocation);

  return (
    <div className='App'>
      <SearchBar setGeoLocation={setGeoLocation} />
      <CardsOverview />

      <GithubSticker link={process.env.REACT_APP_GITHUB_ACCOUNT} />
    </div>
  );
};

export default App;
