import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Receipt } from "lucide-react";
import useUserStore from "@/store/user-store";
import useResponsive from "@/hooks/use-responsive";
import useGoogleAuth from "@/hooks/use-google-auth";

const Navbar = () => {
  const { user, setOpenSignInModal } = useUserStore();
  const { isMobile } = useResponsive();
  const { loading, handleGoogleSignOut } = useGoogleAuth();

  return (
    <header className="flex justify-between items-center py-5 md:py-8 px-8 md:px-12 fixed w-full z-10 bg-bgMain">
      <div className="flex gap-2 items-center">
        <Receipt color="#2A8E9E" size={24} />
        <p className="text-2xl font-semibold text-sidemain w-full md:w-1/2">
          FinSphere
        </p>
      </div>
      {!user ? (
        <Button className="cursor-pointer bg-main hover:bg-sidemain" size={isMobile ? "default" : "lg"} onClick={() => setOpenSignInModal(true)}>Sign In</Button>
      ) : (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger disabled={loading}>{user?.name || "User"}</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Dashboard</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleGoogleSignOut}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </header>
  );
};

export default Navbar;
