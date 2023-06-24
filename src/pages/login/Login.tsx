// import { Link } from "react-router-dom";
import { Google } from "react-bootstrap-icons";
import "./Login.css";

export const Login = () => {
  return (
    <div className="loginPage">
      <h1 className="header__text">Log Into My Account</h1>
      <div className="login__box">
        <button className="google__btn">
          <Google />
          Sign in with Google
        </button>
        <p className="login__text">or</p>
        <input
          className="login__input"
          type="text"
          placeholder="Email or Username"
        />
        <input
          className="password__input"
          type="password"
          placeholder="Password"
        />
        <button className="login__box__btn">Log In</button>
      </div>
      <div className="login__more">
        {/* <Link to="/register" className="underline"> */}
        Don't have an account?
        {/* </Link> */}
        <p className="underline">Forgot password?</p>
      </div>
    </div>
  );
};
