// src/auth.js
import { PublicClientApplication } from "@azure/msal-browser";
import { loginRequest } from "./authConfig";

const msalConfig = {
  auth: {
    clientId: "2b6224d0-3907-467f-a0cc-da93f5b6345c",
    authority:
      "https://login.microsoftonline.com/45138c60-7951-461a-a9d1-7c6603de4d7e",
    redirectUri: "http://localhost:3000",
  },
};

const msalInstance = new PublicClientApplication(msalConfig);

export default msalInstance;
