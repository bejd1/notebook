import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { Google } from "react-bootstrap-icons";
import { useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  email: string;
  password: string;
}

export const Register = () => {
  const [authing, setAuthing] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const { email, password } = data;
    signUp(email, password);
  };

  const signInWithGoogle = async () => {
    setAuthing(true);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider()).then((response) => {
        console.log(response.user.uid);
        navigate("/notebook");
      });
    } catch (err) {
      console.log(err);
      setAuthing(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          console.log(userCredential);
          navigate("/tools");
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register-container">
      <h2>Start save notice for free</h2>
      <div className="register-box">
        <button
          className="google-btn"
          style={{ border: "1px solid #fff" }}
          onClick={signInWithGoogle}
          disabled={authing}
        >
          <Google /> Sign in with Google
        </button>
        <p>or</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="register-box-column">
            <input
              style={{ width: "100%" }}
              {...register("email", {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
              className="register-email-input"
              type="email"
              placeholder="Email"
              id="email"
              name="email"
            />
            {errors.email && <span className="error">Invalid email</span>}
            <input
              {...register("password", {
                required: true,
                minLength: 6,
              })}
              className="register-password-input"
              type="password"
              placeholder="Password"
              id="password"
              name="password"
            />
            {errors.password && (
              <span className="error">
                Password must have at least 6 characters
              </span>
            )}
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
