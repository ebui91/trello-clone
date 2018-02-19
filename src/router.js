import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Import Component routes here
import AllBoards from './components/AllBoards/AllBoards';
import Board from './components/Board/Board';
import Landing from './components/Landing/Landing';
import LoginPage from './components/LoginPage/LoginPage';

export default(
  <BrowserRouter>
    <Switch>
      <Route component={Landing} exact path='/'/>
      <Route component={LoginPage} path='/login'/>
      <Route component={AllBoards} path='/boards'/>
      <Route component={Board} path='/board'/>
    </Switch>
  </BrowserRouter>
)