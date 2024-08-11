import { useMsal } from "@azure/msal-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { accounts, instance } = useMsal();
  const navigate = useNavigate();
  console.log("accounts: ", accounts);

  const logout = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri: "/",
    });
  };
  return (
    <div>
      <h1>Home Page </h1>
      <p>Welcome {accounts[0]?.name}</p>
      <button onClick={() => navigate("/profile")}>Profile</button>
      <button onClick={logout}>Signout</button>
    </div>
  );
};

export default Home;
