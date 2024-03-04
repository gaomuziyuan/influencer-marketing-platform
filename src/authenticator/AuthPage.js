import { useContext, useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Login from "./Login";
import SignUp from "./SignUp";
import "./AuthPage.scss";

function AuthPage() {
  const [authPageStatus, setAuthPageStatus] = useState("login");
  const [pageComponent, setPageComponent] = useState(<Login />);

  useEffect(() => {
    switch (authPageStatus) {
      case "login":
        setPageComponent(<Login setAuthPageStatus={setAuthPageStatus} />);
        break;
      case "signUp":
        setPageComponent(<SignUp setAuthPageStatus={setAuthPageStatus} />);
        break;
      default:
        setPageComponent(<Login setAuthPageStatus={setAuthPageStatus} />);
        break;
    }
  }, [authPageStatus]);

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(/images/Login_image.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={12} square>
        <div className="auth-page-content-container">
          <div className="auth-logo-container">
            <img
              className="auth-navbar-logo-img"
              src="/images/VMAX_Logo_Main.png"
              alt="VMAX logo"
            />
            <img
              className="auth-lightning-logo"
              src="/images/Lightning.svg"
              alt="logo lightning"
            />
            <p className="auth-navbar-title">Shop</p>
          </div>
          {pageComponent}
        </div>
      </Grid>
    </Grid>
  );
}

export default AuthPage;
