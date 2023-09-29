import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUpPage from './components/pages/SignUpPage';
import LoginPage from './components/pages/loginPage';

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
        <Route path="/">
          {/* This route will match the root path '/' */}
          <SignUpPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
