import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUpPage from './components/pages/SignUpPage';
import LoginPage from './components/pages/loginPage';
import HomePage from './components/pages/HomePage';
import Send from './components/pages/Send';

function App() {
  return (
    <Router>
      <Switch>
  <Route path="/signup">
    <SignUpPage />
  </Route>
  <Route path="/login">
    <LoginPage />
  </Route>
  <Route path="/send">
    <Send />
  </Route>
  <Route path="/home">
    <HomePage />
  </Route>
  <Route path="/">
    <HomePage />
  </Route>
</Switch>

    </Router>
  );
}

export default App;
