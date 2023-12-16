
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import classes from './ReadMsg.module.css';

const ReadMsg = () => {
    const {id}=useParams();
    const mails=useSelector(state=>state.mail.mails)

    const singleMail=mails.filter((item)=>item.id===id);
    const message=singleMail[0].message
    console.log(singleMail,'message');

  return (
    <Fragment>
    <div className={classes.message}>{message}</div>
    </Fragment>
  )
}

export default ReadMsg;