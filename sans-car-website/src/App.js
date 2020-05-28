import React from 'react';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Home from './components/pages/Home';
import About from './components/pages/About';

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
          <Route path="/about">
            <About />
          </Route>
          <Route path="/add-bot" component={() => {
            window.location.href = "https://discordapp.com/oauth2/authorize?client_id=688911764703674431&scope=bot";
            return null;
          }}>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


export default App;