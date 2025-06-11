import { lazy, useMemo } from "react";
import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import paths from "@/lib/constants/path";
import useUserStore from "@/store/user-store";
import { User } from "@/types/user";

const PageNotFoundView = lazy(() => import("@/components/app/page-not-found"));
const LoginPage = lazy(() => import("@/pages/login/login-view"));
const LandingPageView = lazy(() => import("@/pages/landing/landing-view"));
const DashboardPageView = lazy(
  () => import("@/pages/dashboard/views/dashboard-view")
);

const createAppRouter = ({ user }: { user: User | null }) => {
  return createBrowserRouter([
    {
      path: paths.home.path,
      element: <LandingPageView />
    },
    {
      path: paths.login.path,
      element: user ? (
        <Navigate to={paths.dashboard.path} replace />
      ) : (
        <LoginPage />
      ),
    },
    {
      path: paths.dashboard.path,
      element: user ? (
        <DashboardPageView />
      ) : (
        <Navigate to={paths.home.path} replace />
      ),
    },
    {
      path: "*",
      Component: PageNotFoundView,
    },
  ]);
};

const AppRouter = () => {
  const { user } = useUserStore();
  const router = useMemo(() => createAppRouter({ user }), [user]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
