import { Link } from "react-router-dom";
import "./Register.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Google } from "react-bootstrap-icons";
import { useState } from "react";

interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const Register = () => {
  const [values, setValues] = useState<RegisterFormValues>({
    firstName: "",
    lastName: "",
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
    setValues({ firstName: "", lastName: "", email: "", password: "" });
  };
  return (
    <div className="register-container">
      <h2>Start save notice for free</h2>
      <div className="register-box">
        <button className="google-btn">
          <Google /> Sign in with Google
        </button>
        <p>or</p>
        <form onSubmit={handleSubmit}>
          <div className="register-box-column">
            <input
              className="register-firstName-input"
              type="text"
              placeholder="First Name"
              id="firstName"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
            />
            <input
              className="register-lastName-input"
              type="text"
              placeholder="Last Name"
              id="lastName"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
            />
            <input
              className="register-email-input"
              type="email"
              placeholder="Email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
            <input
              className="register-password-input"
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
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
          <button className="register-btn">Create account</button>
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
