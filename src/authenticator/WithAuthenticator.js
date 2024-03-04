import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import { createContext, useEffect, useState } from "react";
import AuthPage from "./AuthPage";
import UserPool from "./UserPool";
import { useDispatch } from "react-redux";
import { loadState, clearState } from "../redux/actions";

const AuthContext = createContext();

const WithAuthenticator = (props) => {
  const [loggedInStatus, setLoggedInStatus] = useState("loading");
  const dispatch = useDispatch();

  useEffect(() => {
    getSession()
      .then((session) => {
        const cognitoUser = UserPool.getCurrentUser();
        if (cognitoUser) {
          // If there's a current user, you can get their attributes
          cognitoUser.getSession((err, session) => {
            if (!err) {
              cognitoUser.getUserData((err, data) => {
                if (err) {
                  console.error("Error fetching user attributes: " + err);
                } else {
                  dispatch(loadState(data));
                }
              });
            }
          });
        } else {
          console.log("No authenticated user.");
        }
        setLoggedInStatus("loggedIn");
      })
      .catch((err) => {
        dispatch(clearState());
        setLoggedInStatus("notLoggedIn");
      });
  }, []);

  const getSession = async () => {
    await new Promise((resolve, reject) => {
      const user = UserPool.getCurrentUser();
      if (user) {
        user.getSession((err, session) => {
          if (err) {
            reject(err);
          } else {
            resolve(session);
          }
        });
      } else {
        reject();
      }
    });
  };

  const authenticate = async (Username, Password) => {
    await new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username,
        Pool: UserPool,
      });

      const authDetails = new AuthenticationDetails({
        Username,
        Password,
      });

      user.authenticateUser(authDetails, {
        onSuccess: (result) => {
          console.log("login success", result);
          resolve(result);
        },
        onFailure: (err) => {
          console.log("login failure", err);
          reject(err);
          console.log(err);
        },
        newPasswordRequired: (data) => {
          console.log("new password required", data);
          resolve(data);
        },
      });
    });
  };

  const logout = () => {
    const user = UserPool.getCurrentUser();
    user.signOut();
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{
        authenticate,
        getSession,
        logout,
      }}
    >
      {loggedInStatus === "loading" && <></>}
      {loggedInStatus === "loggedIn" && props.children}
      {loggedInStatus === "notLoggedIn" && <AuthPage />}
    </AuthContext.Provider>
  );
};

export { WithAuthenticator, AuthContext };
