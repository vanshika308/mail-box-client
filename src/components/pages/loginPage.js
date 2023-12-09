import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { authenticationAction } from "../store/auth";

const LoginPage=()=>{


  const history= useHistory();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const dispatch = useDispatch();

  const redirectToLoginPage = () => {
    history.push('/signup');
  };


  const authenticationToken = useSelector((state)=>state.auth.token);

  useEffect(() => {
    if (!authenticationToken) {
      emailInputRef.current.value = '';
      passwordInputRef.current.value = '';
    }
  }, [authenticationToken]);

  const submitHandler=(event)=>{

    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    let url =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCoB02UVmQg-beC_k9TAAKtRO5sfuxQVxM';

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
        res.json().then((data) => {
          console.log(data);
          alert(data.error.message);
        });
      }
    })
    .then((data) => {
      // Dispatch the action with idToken and email properties
      console.log(data.idToken)
      console.log(enteredEmail)
      dispatch(authenticationAction.login({ token: data.idToken, email: enteredEmail }));
      console.log(authenticationAction)
      console.log('User has successfully logged in!!');
      history.push('/home');
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return(
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <label>Email:</label>
          <input type="email" ref={emailInputRef} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" ref={passwordInputRef} required/>
        </div>
        <button>
          Login
        </button>
        <button
          type="button"
          onClick={redirectToLoginPage}
        >
          Create new Account
        </button>
      </form>
    </div>
  );
}

export default LoginPage;