import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./WithAuthenticator";
import { CognitoUser, CognitoUserAttribute } from "amazon-cognito-identity-js";
import UserPool from "./UserPool";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { setValue } from "../redux/actions";
import { useDispatch } from "react-redux";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      @ {new Date().getFullYear()} V-Max Media. All Rights Reserved
    </Typography>
  );
}

function SignUp({ setAuthPageStatus }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyProcess, setVerifyProcess] = useState(false);
  const [OTP, setOTP] = useState("");

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    const attributeList = [];
    attributeList.push(
      new CognitoUserAttribute({
        Name: "email",
        Value: email,
      })
    );
    UserPool.signUp(username, password, attributeList, null, (err, data) => {
      if (err) {
        console.log(err);
        alert("Couldn't sign up");
      } else {
        setVerifyProcess(true);
        alert("User Added Successfully");
      }
    });
  };

  const verifyAccount = (e) => {
    e.preventDefault();
    const user = new CognitoUser({
      Username: username,
      Pool: UserPool,
    });
    console.log(user);
    user.confirmRegistration(OTP, true, (err, data) => {
      if (err) {
        console.log(err);
        alert("Couldn't verify account");
      } else {
        console.log(data);
        alert("Account verified successfully");
        setAuthPageStatus("login");
      }
    });
  };

  return (
    <Box
      sx={{
        mb: 10,
        padding: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      <Box
        component="form"
        onSubmit={!verifyProcess ? onSubmit : verifyAccount}
        sx={{ width: "98%", mt: 1 }}
      >
        {!verifyProcess ? (
          <>
            <TextField
              margin="normal"
              required
              fullWidth
              label="User Name"
              name="username"
              autoComplete="nope"
              value={username.toLowerCase().trim() || null}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email"
              name="email"
              autoComplete="nope"
              value={email.toLowerCase().trim() || null}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password || null}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
          </>
        ) : (
          <>
            <TextField
              margin="normal"
              required
              fullWidth
              label="OTP"
              name="OTP"
              autoComplete="nope"
              value={OTP || null}
              onChange={(e) => setOTP(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Verify
            </Button>
          </>
        )}
        <Grid container>
          <Grid item xs>
            <Link variant="body2"></Link>
          </Grid>
          <Grid item>
            <Link
              variant="body2"
              style={{ cursor: "pointer" }}
              onClick={() => setAuthPageStatus("login")}
            >
              Have an account? Log In
            </Link>
          </Grid>
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Box>
    </Box>
  );
}

export default SignUp;
