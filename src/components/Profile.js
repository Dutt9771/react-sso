import React from "react";
import { useMsal } from "@azure/msal-react";
import { callMsGraph } from "../graph"; // Ensure this is correctly implemented
import { loginRequest } from "../authConfig";

const Profile = () => {
  const { instance, accounts } = useMsal();
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

  return (
    <div>
      <h1>Profile Page</h1>
      {profileData ? (
        <div>
          <h2>Welcome, {profileData.displayName}</h2>
          <p>Email: {profileData.mail}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
