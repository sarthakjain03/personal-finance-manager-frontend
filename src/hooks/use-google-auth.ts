import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "@/store/user-store";
import getGoogleUser from "@/api/auth/get-google-user";
import { toast } from "sonner";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import userLogout from "@/api/auth/user-logout";

const useGoogleAuth = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  const [loading, setLoading] = useState(false);

  const login = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      const accessToken = credentialResponse?.access_token;
      const expiresIn = credentialResponse?.expires_in;
      const userDetails = await getGoogleUser(accessToken, expiresIn);
      if (userDetails?.success) {
        if (
          userDetails?.currentBalance !== undefined &&
          userDetails?.name !== undefined &&
          userDetails?.email !== undefined
        ) {
          navigate("/auth");
          setUser({
            name: userDetails?.name,
            email: userDetails?.email,
            profilePhotoUrl: userDetails?.photoUrl,
            currentBalance: userDetails?.currentBalance,
            currencyFormat: userDetails?.currencyFormat || "INR",
          });
        }
      } else {
        toast.error(userDetails?.message);
      }
      setLoading(false);
    },
    onError: () => {
      setLoading(false);
    },
  });

  const handleGoogleLogin = () => {
    setLoading(true);
    login();
  };

  const handleGoogleSignOut = async () => {
    setLoading(true);
    try {
      googleLogout();
      const response = await userLogout();
      if (response?.success) {
        setUser(null);
        navigate("/");
      } else {
        toast.error(response?.message);
      }

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
