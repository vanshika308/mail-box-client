import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { updateInbox } from './mailSlice'; // Assuming the action name is 'updateInbox' in 'mailSlice'

import classes from './Inbox.module.css';

const InboxPage = () => {
  const dispatch = useDispatch(); // Fixed missing function call

  const mailInInbox = useSelector(state => state.mail.mails);
  const myEmail = localStorage.getItem('email').replace(/['@','.']/g, '');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://book-search-app-62511-default-rtdb.firebaseio.com/${myEmail}.json`);
        const mailData = await response.json();
        
        let data = [];
        for (let key in mailData) {
          data.push({ id: key, ...mailData[key] });
        }

        dispatch(updateInbox(data)); // Dispatch the action to update the inbox in Redux state
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error - You might want to set an error state or alert the user
      }
    };

    fetchData();
  }, [dispatch, myEmail]); // Added dependencies to the useEffect

  return (
    <div className={classes.main}>
      <div className={classes.row}>
        {mailInInbox.map((item) => (
          <div className={classes.row1} key={item.id}>
            <div className={classes.user}>{item.sender}</div>
            <div className={classes.subject}>{item.subject}</div>
            <div className={classes.msg}>
                <NavLink to={`/message/${item.id}`}>message</NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InboxPage;
