import { useHistory } from 'react-router-dom';
import { useRef, useState } from 'react';
import './SignUpPage.css'

const SignUpPage=()=>{
    const emailInputRef =useRef();
    const passwordInputRef=useRef();
    const confirmPasswordInputRef=useRef();

    const history = useHistory();

    const[isLogin,setIsLogin]= useState(false);

    const redirectToLoginPage = () => {
      history.push('/login');
    };

    const SubmitHandler = (event) => {
      event.preventDefault();
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;
      const enteredConfirmPassword = confirmPasswordInputRef.current.value;
  
      if (!isLogin && enteredPassword !== enteredConfirmPassword) {
        alert('Passwords do not match');
        return;
      }
  
      let url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCoB02UVmQg-beC_k9TAAKtRO5sfuxQVxM';
  
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              alert(data.error.message);
              throw new Error(data.error.message);
            });
          }
        })
        .then(() => {
          setIsLogin(true);
          history.push('/login');
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return(
        <div className='form-container'>
          Signup  
          <form>
            <label>Email</label>
            <input
              type='email'
              required ref={emailInputRef}
            /><br/>
            <label>Password</label>
            <input
               type='password'
               required ref={passwordInputRef}
            /><br/>
            <label>Confirm Password</label>
            <input
              type='password'
              required ref={confirmPasswordInputRef}
            /><br/>
            <button
               type="submit"
               onClick={SubmitHandler}
            >SIGN UP</button>
            <br />
        <button
          type="button"
          onClick={redirectToLoginPage}
        >
          Already have an account? Sign in
        </button>
          </form>
        </div>
    )
}

export default SignUpPage;