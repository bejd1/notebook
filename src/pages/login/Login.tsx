import { Link, useNavigate } from "react-router-dom";
import { Google } from "react-bootstrap-icons";
import "./Login.css";
import { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  getAuth,
} from "firebase/auth";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authing, setAuthing] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();

  // login with email and password
  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthing(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.log(response.user.uid);
        navigate("/notebook");
      })
      .catch((error) => {
        console.log(error);
        setAuthing(false);
      });
  };
  // login with google

  const signInWithGoogle = () => {
    setAuthing(true);

    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        console.log(response.user.uid);
        navigate("/notebook");
      })
      .catch((error) => {
        console.log(error);
        setAuthing(false);
      });
  };

  // clear input

  const clearInput = () => {
    setPassword("");
    setEmail("");
  };

  return (
    <div className="login-container">
      <h2>Log Into My Account</h2>
      <div className="login-box">
        <button
          onClick={signInWithGoogle}
          disabled={authing}
          className="google-btn"
        >
          <Google />
          Sign in with Google
        </button>
        <form onSubmit={login}>
          <p>or</p>
          <input
            className="login-input"
            type="text"
            placeholder="Email or Username"
            id="email"
            name="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            className="password-input"
            placeholder="Password"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <button onClick={clearInput} type="submit" className="login-btn">
            Log In
          </button>
        </form>
      </div>
      <div className="login-register">
        <Link to="/register" className="login-container-login-btn">
          Don't have an account?
        </Link>
      </div>
    </div>
  );
};
