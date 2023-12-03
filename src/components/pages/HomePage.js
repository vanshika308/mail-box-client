
import { useDispatch } from "react-redux";
import { authenticationAction } from "../store/auth";
import { Fragment } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const HomePage=()=>{

  const dispatch=useDispatch()
  const logoutHandler =()=>{
    dispatch(authenticationAction.logout());
  }
  return (
    <Fragment>
      <div>Welcome</div>
<button onClick={logoutHandler}>logout</button>
<Link to='/send'>Compose Email</Link>
    </Fragment>
  )
};

export default HomePage;