// src/index.js

import React from "react";
import ReactDOM from "react-dom";
import { MsalProvider, useMsal } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig, loginRequest } from "./authConfig";
import App from "./App";
import { BrowserRouter as Router, Navigate } from "react-router-dom";

const msalInstance = new PublicClientApplication(msalConfig);

const AuthWrapper = () => {
  const { instance, inProgress } = useMsal();

  React.useEffect(() => {
    if (inProgress === "none") {
      const accounts = instance.getAllAccounts();
      if (accounts.length === 0) {
        instance.loginRedirect(loginRequest).catch((e) => console.error(e));
      }
    }
  }, [instance, inProgress]);

  return <App />;
};

ReactDOM.render(
  <MsalProvider instance={msalInstance}>
    <Router>
      <AuthWrapper />
    </Router>
  </MsalProvider>,
  document.getElementById("root")
);
