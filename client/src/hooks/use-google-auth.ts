import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useUserStore from "@/store/user-store";
import { googleSignInState } from "@/lib/env";
import googleSignOut from "@/api/auth/google-signout";

const useGoogleAuth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useUserStore();
  const [loading, setLoading] = useState(false);

  const handleGoogleCallback = () => {
    const hashParams = new URLSearchParams(location.hash.substring(1));
    const accessToken = hashParams.get("access_token");
    const tokenType = hashParams.get("token_type");
    const expiresIn = hashParams.get("expires_in");
    const state = hashParams.get("state");
    const error = hashParams.get("error");

    if (state !== googleSignInState) {
      // TODO:
      // handle this properly
      // add unauthorized error toast
    }

    if (error) {
      console.error("OAuth error:", error);
      return;
    }

    if (!accessToken) {
      console.log("No access token found in URL.");
      return;
    }

    // TODO: get proper name and email from Google API

    setUser({
      name: "John Doe",
      email: "johndoe@example.com",
      accessToken,
      tokenExpiry: Date.now() + Number(expiresIn) * 1000,
    });

    // TODO: redirect to dashboard or homepage after setting the user in userStore
  };

  const handleGoogleSignOut = async () => {
    setLoading(true);
    try {
      if (user?.accessToken) {
        await googleSignOut(user.accessToken);
        setUser(null);
      }

      navigate("/");
    } catch (error) {
      console.error(error);
      throw new Error("Error occurred while signing out from Google");
    }
    setLoading(false);
  };

  return { loading, handleGoogleSignOut, handleGoogleCallback };
};

export default useGoogleAuth;
