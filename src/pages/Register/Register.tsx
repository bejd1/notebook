import { Link } from "react-router-dom";
import "./Register.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Google } from "react-bootstrap-icons";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";

export const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const signUp = (e: React.FormEvent) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });

    setPassword("");
    setEmail("");
  };

  return (
    <div className="register-container">
      <h2>Start save notice for free</h2>
      <div className="register-box">
        <button className="google-btn">
          <Google /> Sign in with Google
        </button>
        <p>or</p>
        <form onSubmit={signUp}>
          <div className="register-box-column">
            {/* <input
              className="register-firstName-input"
              type="text"
              placeholder="First Name"
              id="firstName"
              name="firstName"
              onChange={(e) => {
                setValues(e.target.value);
              }}
            />
            <input
              className="register-lastName-input"
              type="text"
              placeholder="Last Name"
              id="lastName"
              name="lastName"
              onChange={(e) => {
                setValues(e.target.value);
              }}
            /> */}
            <input
              className="register-email-input"
              type="email"
              placeholder="Email"
              id="email"
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              className="register-password-input"
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div className="register-check">
            <ul className="register-check-list">
              <li>
                <CheckCircleIcon style={{ fontSize: "16px" }} />A minimum of 10
                characters
              </li>
              <li>
                <CheckCircleIcon style={{ fontSize: "16px" }} />
                At least one lowercase letter
              </li>
              <li>
                <CheckCircleIcon style={{ fontSize: "16px" }} />
                At least one number
              </li>
              <li>
                <CheckCircleIcon style={{ fontSize: "16px" }} />
                At least one uppercase letter
              </li>
            </ul>
          </div>
          <button type="submit" className="register-btn">
            Create account
          </button>
        </form>
      </div>
      <div className="register-container-login">
        <p>Have an account?</p>
        <Link to="/login" className="register-container-login-btn">
          Sign In
        </Link>
      </div>
    </div>
  );
};
