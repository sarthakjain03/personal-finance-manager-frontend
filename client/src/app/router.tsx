import { lazy, useMemo } from "react";
import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import paths from "@/lib/constants/path";
import useUserStore from "@/store/user-store";
import { User } from "@/types/user";
import PageNotFound from "@/components/app/page-not-found";

const PageNotFoundView = lazy(() => import("@/components/app/page-not-found"));

// TODO: import all page views as lazy components
// TODO: create a User type and fill the createBrowserRouter array

const createAppRouter = ({ user }: { user: User | null }) => {
  return createBrowserRouter([
    {
      path: paths.login.path,
      element: user ? <Navigate to={paths.home.path} /> : <></>,
    },
    {
      path: paths.home.path,
      element: user ? (
        <></>
      ) : (
        <Navigate to={paths.login.getHref(paths.home.path)} replace />
      ),
      children: [
        {
          path: "*",
          Component: PageNotFoundView,
        },
      ],
    },
  ]);
};

const AppRouter = () => {
  const { user } = useUserStore();
  const router = useMemo(() => createAppRouter({ user }), [user]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
