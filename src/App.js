import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import SignUpPage from './components/pages/SignUpPage';
import LoginPage from './components/pages/LoginPage';
import HomePage from './components/pages/HomePage';
import InboxPage from './components/pages/inboxPage';
import Send from './components/pages/Send';
import { useSelector } from 'react-redux';
import ReadMsg from './components/pages/ReadMsg';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      <Switch>
        <Route path="/signup" component={SignUpPage} />
        <Route path="/login" component={LoginPage} />
        <Route path='/send' element={isAuthenticated ? <Send/> : <SignUpPage />} />
      <Route path='/message/:id' element={isAuthenticated ? <ReadMsg /> : <SignUpPage />} /> 
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
