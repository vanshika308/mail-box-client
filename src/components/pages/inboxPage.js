import { useDispatch, useSelector } from 'react-redux';
import classes from './Inbox.module.css'
import { useEffect } from 'react';
const InboxPage=()=>{


    const dispatch=useDispatch;
    const mailInInbox=useSelector(state=>state.mail.mails);
    const myEmail=localStorage.getItem('email').replace(/['@','.']/g,'');

    let data=[];

    useEffect(()=>{
        const fetchDaata=async()=>{
            const reponse=await fetch(`https://book-search-app-62511-default-rtdb.firebaseio.com/${myEmail}.json`);

            const mailData=await reponse.json();
            console.log('useEffectcalled', mailData);
            for(let key in mailData){
                data=[{id:key,...mailData[key]},...data]
            }

            dispatch(mailSliceAction.updateInbox(data))

        }
        fetchDaata();
    },[])
    console.log(data,'data');

    return(
        <div className={classes.main}>
        <div className={classes.row}>
            {

                mailInInbox.map((item)=>(
                    <div className={classes.row1} key={item.id}>
                    <div className={classes.user}>{item.sender}</div>
            <div className={classes.subject}>{item.subject}</div>
            </div>
                ))

            }
        </div>
    </div>
    );
}

export default InboxPage;