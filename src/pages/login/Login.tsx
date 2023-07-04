import { Link } from "react-router-dom";
import { Google } from "react-bootstrap-icons";
import "./Login.css";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const signIn = (e: React.FormEvent) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const clearInput = () => {
    setPassword("");
    setEmail("");
  };

  return (
    <div className="login-container">
      <h2>Log Into My Account</h2>
      <div className="login-box">
        <form onSubmit={signIn}>
          <button className="google-btn">
            <Google />
            Sign in with Google
          </button>
          <p>or</p>
          <input
            className="login-input"
            type="text"
            placeholder="Email or Username"
            id="email"
            name="email"
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
