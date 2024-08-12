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
  const { instance, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    console.log("inProgress: ", inProgress);
    if (!isAuthenticated && inProgress === "none") {
      // Only trigger login if user is not authenticated and there is no ongoing login
      instance.loginRedirect(loginRequest);
    }
  }, [isAuthenticated, inProgress, instance]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/medical" />} />

        {/* Parent route */}
        <Route path="/medical">
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

export default App;
