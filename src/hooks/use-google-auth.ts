import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useUserStore from "@/store/user-store";
import { googleSignInState } from "@/lib/env";
import googleSignOut from "@/api/auth/google-signout";
import getUser from "@/api/auth/get-user";
import { toast } from "sonner";

const useGoogleAuth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useUserStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.accessToken && user?.tokenExpiry) {
      if (user.tokenExpiry <= Date.now()) {
        handleGoogleSignOut();
      }
    }
  }, [])

  const handleGoogleCallback = async () => {
    const hashParams = new URLSearchParams(location.hash.substring(1));
    const accessToken = hashParams.get("access_token");
    // const tokenType = hashParams.get("token_type");
    const expiresIn = hashParams.get("expires_in");
    const state = hashParams.get("state");
    const error = hashParams.get("error");

    if (!error && !accessToken) {
      return;
    }

    if (state !== googleSignInState) {
      toast.error("Invalid Google Sign In Attempt");

    } else if (error) {
      console.error("OAuth error:", error);
      if (error !== "access_denied") {
        toast.error("Error occurred while signing in with Google");
      }

    } else if (!accessToken) {
      console.error("No access token generated");
      toast.error("Error occurred while signing in with Google");

    } else {
      setLoading(true);
      const userDetails = await getUser(accessToken);
      if (userDetails) {
        setUser({
          name: userDetails?.name,
          email: userDetails?.email,
          profilePhotoUrl: userDetails?.photoUrl,
          accessToken,
          tokenExpiry: Date.now() + Number(expiresIn) * 1000,
        });
        // navigate("/dashboard");
        // return;
        // TODO: redirect to dashboard or homepage after setting the user in userStore
      }
      setLoading(false)
    }
    
    navigate("/");
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
