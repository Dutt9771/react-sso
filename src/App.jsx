// src/App.js

import React from "react";
import {
  useMsal,
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

const Home = () => <h1>Home Page</h1>;
const Profile = () => <h1>Profile Page</h1>;

const App = () => {
  const { instance, accounts } = useMsal();
  const isAuthenticated = accounts.length > 0;

  const handleLogout = () => {
    instance.logoutRedirect().catch((e) => console.error(e));
  };

  return (
    <div>
      <div>
        {isAuthenticated && <button onClick={handleLogout}>Logout</button>}
        <AuthenticatedTemplate>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <h1>Please log in to access the app.</h1>
        </UnauthenticatedTemplate>
      </div>
    </div>
  );
};

export default App;
