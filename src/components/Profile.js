import React from "react";
import { useMsal } from "@azure/msal-react";
import { callMsGraph } from "../graph"; // Ensure this is correctly implemented
import { loginRequest } from "../authConfig";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { instance, accounts } = useMsal();
  const navigate = useNavigate();
  const [profileData, setProfileData] = React.useState(null);

  React.useEffect(() => {
    if (accounts.length > 0) {
      instance
        .acquireTokenSilent({
          ...loginRequest,
          account: accounts[0],
        })
        .then((response) => {
          callMsGraph(response.accessToken).then((data) =>
            setProfileData(data)
          );
        });
    }
  }, [accounts, instance]);
  const logout = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri: "/",
    });
  };
  return (
    <div>
      <h1>Profile Page</h1>
      {console.log("profileData: ", profileData)}
      {profileData ? (
        <div>
          <h2>Welcome, {profileData.displayName}</h2>
          <p>Email: {profileData.userPrincipalName}</p>
          <button onClick={() => navigate("/medical")}>back</button>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
