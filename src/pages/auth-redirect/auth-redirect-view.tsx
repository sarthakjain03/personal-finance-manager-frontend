import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import useUserStore from "@/store/user-store";

const AuthRedirectView = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  return (
    <div className="flex justify-center items-center h-screen bg-bgMain">
      <Loader2 className="animate-spin" size={60} color="#023447" />
    </div>
  );
};

export default AuthRedirectView;
