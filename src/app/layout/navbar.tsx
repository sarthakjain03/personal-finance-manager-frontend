import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Loader2, Receipt } from "lucide-react";
import useUserStore from "@/store/user-store";
import useResponsive from "@/hooks/use-responsive";
import useGoogleAuth from "@/hooks/use-google-auth";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isLandingView = false }) => {
  const { user, setOpenSignInModal } = useUserStore();
  const { isMobile } = useResponsive();
  const { loading, handleGoogleSignOut } = useGoogleAuth();
  const navigate = useNavigate();

  const getUserInitials = (fullName?: string) => {
    if (!fullName) {
      return "User";
    }
    const names = fullName.split(" ");
    return names
      .map((name) => name[0])
      .join("")
      .toUpperCase();
  };

  return (
    <header
      className={`flex justify-between items-center py-5 ${
        isLandingView ? "md:py-8" : ""
      } px-8 md:px-12 fixed w-full z-10 bg-bgMain`}
    >
      <div className="flex gap-2 items-center">
        <Receipt color="#2A8E9E" size={24} />
        <p className="text-2xl font-semibold text-sidemain w-full md:w-1/2">
          FinSphere
        </p>
      </div>
      {!user ? (
        <Button
          className="cursor-pointer bg-main hover:bg-sidemain"
          size={isMobile ? "default" : "lg"}
          onClick={() => setOpenSignInModal(true)}
        >
          Sign In
        </Button>
      ) : loading ? (
        <Button disabled className="bg-main" size={isMobile ? "default" : "lg"}>
          <Loader2 className="animate-spin" />
        </Button>
      ) : (
        <>
          <Popover>
            <PopoverTrigger>
              <Avatar className="cursor-pointer size-10 text-md font-medium text-secondary">
                <AvatarImage src={user?.profilePhotoUrl} />
                <AvatarFallback className="bg-main hover:bg-sidemain">
                  {getUserInitials(user?.name)}
                </AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent>
              <div className="flex flex-col gap-3">
                <p
                  className="text-main text-sm font-medium cursor-pointer"
                  onClick={() => navigate("/dashboard")}
                >
                  Dashboard
                </p>
                <p className="text-main text-sm font-medium cursor-pointer">
                  My Account
                </p>
                <p
                  className="text-main text-sm font-medium cursor-pointer"
                  onClick={handleGoogleSignOut}
                >
                  Logout
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </>
      )}
    </header>
  );
};

export default Navbar;
