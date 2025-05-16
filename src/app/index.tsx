import AppProvider from "./provider";
import AppRouter from "./router";
import useUserStore from "@/store/user-store";
import SignInDialog from "@/components/app/signin-dialog";

const App = () => {
  const { openSignInModal } = useUserStore();

  return (
    <AppProvider>
      <AppRouter />
      {openSignInModal && <SignInDialog />}
    </AppProvider>
  );
};

export default App;
