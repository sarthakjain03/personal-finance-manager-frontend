import { lazy, useMemo } from "react";
import {
  Navigate,
  useLocation,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import paths from "@/lib/constants/path";

// TODO: import all page views as lazy components
// TODO: create a User type and fill the createBrowserRouter array

const createAppRouter = ({ user: any }) => {
  return createBrowserRouter([]);
};

const AppRouter = () => {
    // const { user } = useUserStore();
//   const router = useMemo(() => createAppRouter({ user }), [user]);
  const router = useMemo(() => createAppRouter({ user: null }), []);

  return <RouterProvider router={router} />;
};

export default AppRouter;
