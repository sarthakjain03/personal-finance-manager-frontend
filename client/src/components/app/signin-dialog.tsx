import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import googleSignIn from "@/api/auth/google-signin";
import useUserStore from "@/store/user-store";

const SignInDialog = () => {
  const { openSignInModal, setOpenSignInModal } = useUserStore();

  const handleSignInWithGoogle = () => {
    googleSignIn();
    setOpenSignInModal(false);
  }

  return (
    <Dialog
      open={openSignInModal}
      onOpenChange={(value) => setOpenSignInModal(value)}
    >
      <DialogContent className="sm:max-w-[500px] lg:max-w-3/4 p-0 overflow-hidden">
        <div className="flex justify-between items-center">
          <img src="/default-img.jpg" alt="default-img" className="w-5 lg:w-100 xl:w-full hidden lg:block" />
          <div className="flex flex-col gap-8 justify-center py-16 lg:py-0 mx-10 lg:mx-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-semibold text-sidemain">
                Sign In to FinSphere
              </h1>
              <p className="text-sm text-gray-500">
                Sign in using your Google account to access your FinSphere
                dashboard now!
              </p>
            </div>
            <Button
              size={"lg"}
              className="bg-bgMain p-6 cursor-pointer"
              variant={"outline"}
              onClick={handleSignInWithGoogle}
            >
              <img
                src="/google-logo.svg"
                alt="google logo"
                className="w-6 h-6"
              />
              Sign In with Google
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignInDialog;
