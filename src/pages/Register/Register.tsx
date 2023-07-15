import Card from "@mui/material/Card";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { Google } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import { tokens } from "../../Theme";

interface IFormInput {
  email: string;
  password: string;
}

export default function Register() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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

  // create account by email
  const signUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          console.log(userCredential);
          navigate("/notebook");
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  // register with google
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

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Card sx={{ width: "520px", marginTop: "140px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", m: "40px 0 20px" }}
          >
            Start save notice for free
          </Typography>
          <Button
            onClick={signInWithGoogle}
            disabled={authing}
            sx={{
              border: "1px solid #fff",
              width: "80%",
              mt: "10px",
              p: "10px 0",
              color: colors.secondary[100],
              borderColor: colors.secondary[100],
            }}
          >
            <Google style={{ marginRight: "5px" }} /> Sign up with Google
          </Button>
          <Typography sx={{ m: "5px 0" }}>or</Typography>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              width: "80%",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                width: "100%",
              }}
            >
              <Box sx={{ mb: "12px" }}>
                <TextField
                  autoFocus
                  {...register("email", {
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  })}
                  type="email"
                  sx={{ width: "100%" }}
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                />
                {errors.email && (
                  <Typography
                    sx={{ p: "0", mt: "12px", color: "#ff3333" }}
                    className="error"
                  >
                    Invalid email
                  </Typography>
                )}
              </Box>
              <Box sx={{ mb: "12px" }}>
                <TextField
                  {...register("password", {
                    required: true,
                    minLength: 6,
                  })}
                  type="password"
                  sx={{ width: "100%" }}
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                />
                {errors.password && (
                  <Typography
                    sx={{ p: "0", mt: "12px", color: "#ff3333" }}
                    className="error"
                  >
                    Password must have at least 6 characters
                  </Typography>
                )}
              </Box>
              <Button
                type="submit"
                sx={{
                  border: "1px solid",
                  width: "100%",
                  mt: "5px",
                  p: "10px 0",
                  color: colors.secondary[100],
                  borderColor: colors.secondary[100],
                }}
              >
                Create account
              </Button>
              <Typography
                sx={{
                  m: "10px 0",
                  fontSize: "13px",
                  margin: "20px 0",
                  textAlign: "center",
                }}
              >
                Have an account?
                <Link
                  style={{ color: colors.secondary[100], marginLeft: "3px" }}
                  to="/login"
                >
                  Sign In
                </Link>
              </Typography>
            </Box>
          </form>
        </Box>
      </Card>
    </Box>
  );
}
