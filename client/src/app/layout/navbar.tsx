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

const Navbar = () => {
  const { isAuthenticated, user } = useUserStore();
  const { isMobile } = useResponsive();

  return (
    <header className="flex justify-between items-center py-5 md:py-8 px-8 md:px-12 fixed w-full z-10 bg-bgMain">
      <div className="flex gap-2 items-center">
        <Receipt color="#2A8E9E" size={24} />
        <p className="text-2xl font-semibold text-sidemain w-full md:w-1/2">
          FinSphere
        </p>
      </div>
      {!isAuthenticated ? (
        <Button className="cursor-pointer bg-main hover:bg-sidemain" size={isMobile ? "default" : "lg"} onClick={() => {}}>Sign In</Button>
      ) : (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger>{user?.name || "User"}</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </header>
  );
};

export default Navbar;
