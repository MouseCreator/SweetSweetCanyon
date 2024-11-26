import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import {ST} from "../../connect/secret";

const OnRegisterCall = () => {
  const { getAccessTokenSilently,
    user,
    error,
    isAuthenticated,
    isLoading } = useAuth0();

  useEffect(() => {
    const sendRegistrationData = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await axios.post(
          ST.HOST_URL + "/auth/register",
          {
            email: user.email,
            name: user.name,
            sub: user.sub,

          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Backend Response:", response.data);
      } catch (error) {
        console.error("Error sending registration data:", error);
      }
    };

    sendRegistrationData();
  }, [getAccessTokenSilently, user]);
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }
  if (!isAuthenticated) {
    return <div>User is not authenticated</div>
  }
  return <div>Registration Complete. Welcome, {user?.name}!</div>;
};

export default OnRegisterCall;