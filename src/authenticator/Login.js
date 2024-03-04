import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./WithAuthenticator";
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

function Login({ setAuthPageStatus }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);

  const { authenticate } = useContext(AuthContext);
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    authenticate(username, password)
      .then((data) => {
        console.log(data);
        window.location.reload();
      })
      .catch((err) => {
        // console.log(err);
        setHasError(true);
      });
  };

  useEffect(() => {
    if (hasError) {
      setHasError(false);
    }
  }, [username, password]);

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
        Sign In
      </Typography>
      <Box component="form" onSubmit={onSubmit} sx={{ width: "98%", mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="User Name"
          name="username"
          autoComplete="email"
          value={username || null}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password || null}
          onChange={(e) => setPassword(e.target.value)}
        />
        {hasError && (
          <Alert fullWidth severity="error">
            Wrong User Name or Password
          </Alert>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link variant="body2" style={{ cursor: "pointer" }}>
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link
              variant="body2"
              style={{ cursor: "pointer" }}
              onClick={() => setAuthPageStatus("signUp")}
            >
              Don't have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Box>
    </Box>
  );
}

export default Login;
