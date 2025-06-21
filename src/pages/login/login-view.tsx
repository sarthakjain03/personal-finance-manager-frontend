import { Card } from "@/components/ui/card";
import {
  Loader2,
  Receipt,
  BanknoteArrowDown,
  Shield,
  Goal,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useGoogleAuth from "@/hooks/use-google-auth";

const LoginPage = () => {
  const { handleGoogleLogin, loading } = useGoogleAuth();
  const navigate = useNavigate();

  return (
    <main className="min-h-screen w-full flex justify-center items-center bg-bgMain py-8 px-5">
      <Card className="max-w-[500px] w-full flex flex-col gap-10 px-10 py-8">
        <div className="flex gap-2 flex-col items-center justify-center">
          <div className="flex gap-2 items-center justify-center">
            <Receipt color="#2A8E9E" size={28} />
            <p
              className="text-3xl font-semibold text-sidemain cursor-pointer"
              onClick={() => navigate("/")}
            >
              FinSphere
            </p>
          </div>
          <p className="text-center text-gray-600">
            Your comprehensive financial management solution
          </p>
        </div>
        <div className="flex">
          <button
            className="w-full cursor-pointer py-2 font-medium flex items-center gap-3 justify-center border rounded-md shadow"
            onClick={() => handleGoogleLogin()}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <img src="/google-logo.svg" alt="google logo" className="w-5" />
                <span>Sign in with Google</span>
              </>
            )}
          </button>
        </div>
        <div className="w-full flex justify-center items-center gap-2">
          <div className="border w-full border-gray-200"></div>
          <div className="text-md text-gray-500 min-w-max">
            Control Your Finances
          </div>
          <div className="border w-full border-gray-200"></div>
        </div>
        <div className="w-full flex gap-3 items-center justify-between">
          <div className="flex gap-2 flex-col items-center justify-center">
            <div className="rounded-full p-2 bg-[#d2fae5]">
              <BanknoteArrowDown size={24} color="#059668" />
            </div>
            <span className="text-sm text-gray-700">Track Expenses</span>
          </div>
          <div className="flex gap-2 flex-col items-center justify-center">
            <div className="rounded-full p-2 bg-[#dbebff]">
              <Shield size={24} color="#2664eb" />
            </div>
            <span className="text-sm text-gray-700">Set Budgets</span>
          </div>
          <div className="flex gap-2 flex-col items-center justify-center">
            <div className="rounded-full p-2 bg-[#f3e8ff]">
              <Goal size={24} color="#9234eb" />
            </div>
            <span className="text-sm text-gray-700">Create Goals</span>
          </div>
        </div>
      </Card>
    </main>
  );
};

export default LoginPage;
