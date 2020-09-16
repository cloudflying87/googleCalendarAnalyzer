import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './pages/Login'
import Dates from './pages/Dates'


function App() {
  return (
      <Router>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/calendar' component={Dates} />
        </Switch>
      </Router>
  );
}

export default App;
