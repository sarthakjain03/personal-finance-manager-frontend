import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "@/store/user-store";
import getGoogleUser from "@/api/auth/get-google-user";
import { toast } from "sonner";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";

const useGoogleAuth = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (user?.accessToken && user?.tokenExpiry) {
  //     if (user.tokenExpiry <= Date.now()) {
  //       handleGoogleSignOut();
  //     }
  //   }
  // }, [])
  // TODO: do something else for logout, handle all token logic in the backend

  const login = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      const accessToken = credentialResponse?.access_token
      const expiresIn = credentialResponse?.expires_in
      const userDetails = await getGoogleUser(accessToken, expiresIn);
      if (userDetails) {
        setUser({
          name: userDetails?.name,
          email: userDetails?.email,
          profilePhotoUrl: userDetails?.photoUrl,
        });
        navigate("/dashboard");
      }
      setLoading(false);
    },
    onError: () => {
      console.log("Login Failed");
      setLoading(false);
    },
  });

  const handleGoogleLogin = () => {
    setLoading(true);
    login();
  }

  const handleGoogleSignOut = async () => {
    setLoading(true);
    try {
      googleLogout();
      setUser(null);

      navigate("/");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
      throw new Error("Error occurred while signing out from Google");
    }
  };

  return { loading, handleGoogleSignOut, handleGoogleLogin };
};

export default useGoogleAuth;
