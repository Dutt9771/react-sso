import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
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
        <Route path="/" element={<Navigate to="/medical" />} />

        {/* Parent route */}
        <Route path="/medical">
          {/* Child routes */}
          <Route index element={<Home />} /> {/* Renders Home on /medical */}
          <Route
            path="profile"
            element={isAuthenticated ? <Profile /> : <Navigate to="/" />}
          />
          {/* Add more child routes here */}
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<Navigate to="/medical" />} />
      </Routes>
    </Router>
  );
};

function MedicalLayout() {
  return (
    <div>
      <h1>Medical Section</h1>
      {/* The child routes will be rendered here */}
      <Outlet />
    </div>
  );
}

export default App;
