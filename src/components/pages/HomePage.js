import classes from './Welcome.module.css';

import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { authAction } from '../storeRedux/authReducer';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { mailSliceAction } from '../storeRedux/emailReducer';

const HomePage = () => {
  const dispatch=useDispatch();
  const [reRender,setreRender]=useState(true);
  const unRead=useSelector(state=>state.mail.unRead)
  const myEmail=localStorage.getItem('email').replace(/['@','.']/g,'');

  let intervalID;
  intervalID = setInterval(()=>{
    setreRender((prev)=>!prev);
    console.log('intervall',intervalID);
  }, 7000);

  const clearInteravl=()=>{
    clearInterval(intervalID);
    console.log(intervalID);
  }

  const logoutHandler =()=>{
    dispatch(authAction.logout());
  }
  let noOfUnread=0;
  useEffect(()=>{
    const fetchDaata=async()=>{
        const reponse=await fetch(`https://book-search-app-62511-default-rtdb.firebaseio.com/inbox/${myEmail}.json`);

        const mailData=await reponse.json();
        // console.log('useEffectcalled', mailData);
        for(let key in mailData){
            // data=[{id:key,...mailData[key]},...data]
            if(mailData[key].dot===true){
              noOfUnread++
              // console.log(noOfUnread,'noOfUnread');
            }
        }
        // console.log(noOfUnread,'noOfUnread');

        dispatch(mailSliceAction.updateUnread(noOfUnread))

    }
    fetchDaata();
},[reRender])

  return (
    <Fragment>
      {/* <button onClick={clearInteravl}>clearInteravl</button> */}
      <div className={classes.main}>
        <div className={classes.header}>
          <div className={classes.welcome}>Welcome to Mail Box</div>
          <Link to='/send' style={{textDecoration:'none'}}>Compose Email</Link>
          <Link to='/inbox' style={{textDecoration:'none'}}>Inbox {unRead}</Link>
          <Link to='/sentbox' style={{textDecoration:'none'}}>Sentbox</Link>
          <Button onClick={logoutHandler}>Logout</Button>
        </div>
      </div>
      
    </Fragment>
  )
}
export default HomePage;