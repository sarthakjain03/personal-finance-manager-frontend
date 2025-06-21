import { lazy, useMemo } from "react";
import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import paths from "@/lib/constants/path";
import useUserStore from "@/store/user-store";
import { User } from "@/types/user";
import LandingPageView from "@/pages/landing/landing-view";
import TermsOfServicePageView from "@/pages/terms-of-service-view";
import PrivacyPolicyPageView from "@/pages/privacy-policy-view";
import AuthRedirectView from "@/pages/auth-redirect/auth-redirect-view";

const PageNotFoundView = lazy(() => import("@/components/app/page-not-found"));
const LoginPage = lazy(() => import("@/pages/login/login-view"));
const DashboardPageView = lazy(
  () => import("@/pages/dashboard/views/dashboard-view")
);

const createAppRouter = ({ user }: { user: User | null }) => {
  return createBrowserRouter([
    {
      path: paths.home.path,
      Component: LandingPageView,
    },
    {
      path: paths.auth.path,
      element: user ? (
        <Navigate to={paths.dashboard.path} replace />
      ) : (
        <AuthRedirectView />
      ),
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
      path: paths["terms-of-service"].path,
      element: <TermsOfServicePageView />,
    },
    {
      path: paths["privacy-policy"].path,
      element: <PrivacyPolicyPageView />,
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
