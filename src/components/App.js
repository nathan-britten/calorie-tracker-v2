import React from 'react';
import {Router, Route, Switch } from 'react-router-dom';

import Header from './Header';
import Home from './pages/Home';
import YourDay from './pages/YourDay';
import Calendar from './pages/Calendar';
import Stats from './pages/Stats';

import history from '../history';

const App = () => {
  return (
    <div className="">
      <Router history={history}>
        <Header />
          <Route path='/' exact component={Home}/>
          <Route  path='/yourday/:id' exact component={YourDay}/>
          <Route   path='/calendar'exact component={Calendar}/>
          <Route  path='/stats' exact component={Stats}/>
      </Router>
    </div>
  )
}

export default App;