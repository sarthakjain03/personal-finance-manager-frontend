import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import useUserStore from "@/store/user-store";

const Navbar = () => {
  const { isAuthenticated, user } = useUserStore();

  return (
    <header className="flex justify-between items-center py-4 px-8 bg-white shadow-md rounded-md">
      <h1 className="text-xl font-semibold">FinSphere</h1>
      {!isAuthenticated ? (
        <Button className="cursor-pointer" onClick={() => {}}>Sign In</Button>
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
