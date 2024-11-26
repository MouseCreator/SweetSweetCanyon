import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import {ST} from "../../connect/secret";
import "./auth.css"
import {Link} from "react-router-dom";
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
        console.log(user)
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
    return <div className={"auth-screen"}>Loading...</div>
  }
  if (error) {
    return (<div className={"auth-screen"}>
      <div className={"auth-content"}>
      <div className={"auth-text"}>Error: {error.message}</div>
      <Link to={"/"} className={"gen-button"}>Back</Link>
      </div>
    </div>)
  }
  if (!isAuthenticated) {
    return (<div className={"auth-screen"}>
      <div className={"auth-content"}>
        <p className={"auth-text"}>
          You've just logged out.
        </p>
        <Link to={"/"} className={"gen-button"}>Back</Link>
      </div>

    </div>)
  }
  return (<div className={"auth-screen"}>
          <div className={"auth-content"}>
            <p className={"auth-text"}>
                Registration Complete.
            </p>
            <p className={"auth-text"}>
              Welcome, { user?.name}!
            </p>
            <Link to={"/"} className={"gen-button green"}>Yay!</Link>
          </div>

        </div>)
};

export default OnRegisterCall;