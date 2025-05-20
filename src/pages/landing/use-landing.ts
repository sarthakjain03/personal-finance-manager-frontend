import useUserStore from "@/store/user-store";
import { useNavigate } from "react-router-dom";

const useLanding = () => {
  const { user, setOpenSignInModal } = useUserStore();
  const navigate = useNavigate();

  const handleSignIn = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      setOpenSignInModal(true);
    }
  };

  return { handleSignIn };
};

export default useLanding;
