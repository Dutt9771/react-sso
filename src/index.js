import React from "react";
import ReactDOM from "react-dom/client"; // Use 'react-dom/client' instead of 'react-dom'
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";
import App from "./App";

// Initialize MSAL instance
const msalInstance = new PublicClientApplication(msalConfig);

// Create a root for rendering
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  </React.StrictMode>
);
