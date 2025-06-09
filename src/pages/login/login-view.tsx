import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Receipt } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const activeClasses = "text-white bg-main";
const inactiveClasses = "text-black bg-white";
const commonClasses =
  "rounded-lg border w-1/2 text-center py-2 font-medium cursor-pointer";

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState("sign-in");
  const navigate = useNavigate();

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <main className="h-screen w-screen flex justify-center items-center bg-bgMain">
      <Card className="w-full max-w-[500px] flex flex-col gap-5 px-6">
        <div className="flex gap-2 items-center justify-center">
          <Receipt color="#2A8E9E" size={28} />
          <p
            className="text-3xl font-semibold text-sidemain cursor-pointer"
            onClick={() => navigate("/")}
          >
            FinSphere
          </p>
        </div>
        <div className="flex rounded-md gap-1 w-full border p-1 bg-bgMain">
          <div
            className={cn(
              commonClasses,
              activeTab === "sign-in" ? activeClasses : inactiveClasses
            )}
            onClick={() => handleTabChange("sign-in")}
          >
            Sign In
          </div>
          <div
            className={cn(
              commonClasses,
              activeTab === "sign-up" ? activeClasses : inactiveClasses
            )}
            onClick={() => handleTabChange("sign-up")}
          >
            Sign Up
          </div>
        </div>
        <div className="w-full flex justify-center items-center gap-2">
          <div className="border w-full border-gray-300"></div>
          <div className="text-md text-gray-400 w-fit">OR</div>
          <div className="border w-full border-gray-300"></div>
        </div>
      </Card>
    </main>
  );
};

export default LoginPage;
