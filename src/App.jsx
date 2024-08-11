import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { loginRequest } from "./authConfig";
import "./App.css";
import Home from "./components/Home";
import Profile from "./components/Profile";

const App = () => {
  const { instance, inProgress, accounts } = useMsal();
  console.log("accounts: ", accounts);
  const isAuthenticated = useIsAuthenticated();
  console.log("isAuthenticated: ", isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated && inProgress === "none") {
      instance.loginRedirect(loginRequest);
    }
  }, [instance, isAuthenticated, inProgress]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
