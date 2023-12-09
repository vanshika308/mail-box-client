import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import SignUpPage from './components/pages/SignUpPage';
import LoginPage from './components/pages/LoginPage';
import HomePage from './components/pages/HomePage';
import InboxPage from './components/pages/inboxPage';
import Send from './components/pages/Send';
import { useSelector } from 'react-redux';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      <Switch>
        <Route path="/signup" component={SignUpPage} />
        <Route path="/login" component={LoginPage} />
        <Route
          path="/send"
          component={isAuthenticated ? Send : LoginPage}
        />
        <Route
          path="/inbox"
          component={isAuthenticated ? InboxPage : LoginPage}
        />
        <Route
          path="/home"
          component={isAuthenticated ? HomePage : LoginPage}
        />
        <Route
          path="/"
          component={isAuthenticated ? HomePage : LoginPage}
        />
      </Switch>
    </Router>
  );
}

export default App;
