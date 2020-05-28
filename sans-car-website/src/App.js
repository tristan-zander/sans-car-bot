import React from 'react';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Home from './components/pages/Home';

function App() {

  // Use client side routing to change page

  return (
    <Router>
      <div className="App" >
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/home">
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


export default App;