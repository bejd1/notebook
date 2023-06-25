import { Link } from "react-router-dom";
import { Google } from "react-bootstrap-icons";
import "./Login.css";
import { useState } from "react";

interface LoginFormValues {
  email: string;
  password: string;
}

export const Login = () => {
  const [values, setValues] = useState<LoginFormValues>({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Submitted values:", values);
    setValues({ email: "", password: "" });
  };
  return (
    <div className="login-container">
      <h2>Log Into My Account</h2>
      <div className="login-box">
        <form onSubmit={handleSubmit}>
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
            value={values.email}
            onChange={handleChange}
          />
          <input
            className="password-input"
            placeholder="Password"
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          <button type="submit" className="login-btn">
            Log In
          </button>
        </form>
      </div>
      <div className="login-register">
        <Link to="/register">
          <p>Don't have an account?</p>
        </Link>
      </div>
    </div>
  );
};
