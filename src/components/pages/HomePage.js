import './HomePage.css';
import { useDispatch } from 'react-redux';
import { authenticationAction } from '../store/auth';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authenticationAction.logout());
  };

  return (
    <Fragment>
      <div className="home-container">
        <h1 className="welcome-text">Welcome</h1>
        <div className="button-container">
          <button onClick={logoutHandler} className="logout-button">
            Logout
          </button>
          <Link to="/send" className="action-link">
            Compose Email
          </Link>
          <Link to="/inbox" className="action-link">
            Inbox
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default HomePage;
