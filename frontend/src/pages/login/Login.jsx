import "./login.css";
import { useContext, useRef } from "react";
import { loginCall } from "../../apicall";
import { AuthContext } from "../../context/AuthContext";
import { Link,useNavigate } from "react-router-dom";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate()
  const { isFetching, dispatch } = useContext(AuthContext);
  const handleSwitch = ()=> {
    navigate('/register')
  }
  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Adverfy</h3>
          <span className="loginDesc">
            Find experts your field
          </span>
        </div>
        <div className="loginRight">
        <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <span></span>
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton" onClick={handleSwitch}>
              {isFetching ? (
                <span></span>
              ) : (
                "Create a New Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
