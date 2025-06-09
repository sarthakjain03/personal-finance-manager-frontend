import useUserStore from "@/store/user-store";
import { useNavigate } from "react-router-dom";

const useLanding = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();

  const handleSignIn = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return { handleSignIn };
};

export default useLanding;
