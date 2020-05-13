import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './Pages/Home.js';
import About from './Pages/About.js';
import Cities from './Pages/Cities.js';
import CityProfile from './Pages/CityProfile.js';
import Universities from './Pages/Universities.js';
import UniversityProfile from './Pages/UniversityProfile.js';
import Visualizations from './Pages/Visualizations.js';
import Attractions from './Pages/Attractions.js';
import AttractionProfile from './Pages/AttractionProfile.js';
import SearchResults from './Pages/SearchResults.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route exact path={'/'} component={Home} />
          <Route exact path={'/universities'} component={Universities} />
          <Route
            path={'/universities/:universityname'}
            component={UniversityProfile}
          />
          <Route path={'/about'} component={About} />
          <Route path={'/home'} component={Home} />
          <Route path={'/visualizations'} component={Visualizations} />
          <Route exact path={'/attractions'} component={Attractions} />
          <Route
            path={'/attractions/:attractionname'}
            component={AttractionProfile}
          />
          <Route exact path={'/cities'} component={Cities} />
          <Route path={`/cities/:cityname`} component={CityProfile} />
          <Route path={`/search/:modelType`} component={SearchResults} />
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
