import { lazy, Suspense, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/app/layout/navbar";
import Footer from "@/app/layout/footer";
import Navigation from "../components/navigation";
import CurrentBalanceCard from "../components/current-balance";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import useUserStore from "@/store/user-store";

const SummaryLazyView = lazy(() => import("./summary-view"));
const TransactionsLazyView = lazy(() => import("./transactions-view"));
const GoalsLazyView = lazy(() => import("./goals-view"));
const BudgetsLazyView = lazy(() => import("./budgets-view"));

const tabsViews = {
  summary: SummaryLazyView,
  transactions: TransactionsLazyView,
  goals: GoalsLazyView,
  budgets: BudgetsLazyView,
};

const SkeletonLoading = (activeTab: string) => {
  switch (activeTab) {
    case "summary":
      return (
        <div className="w-full flex flex-col gap-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            <Skeleton className="rounded-xl h-[140px]" />
            <Skeleton className="rounded-xl h-[140px]" />
          </div>
          <div className="flex flex-col gap-6 w-full">
            <Skeleton className="rounded-xl h-[350px]" />
            <Skeleton className="rounded-xl h-[350px]" />
            <Skeleton className="rounded-xl h-[350px]" />
          </div>
        </div>
      );

    case "transactions":
      return (
        <div className="w-full flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
            <Skeleton className="w-1/4 h-14 rounded-xl" />
            <Skeleton className="w-1/5 h-12 rounded-xl" />
          </div>
          <Skeleton className="rounded-xl w-full h-[700px]" />
        </div>
      );

    case "goals":
      return (
        <div className="w-full flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
            <Skeleton className="w-1/4 h-14 rounded-xl" />
            <Skeleton className="w-1/5 h-12 rounded-xl" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            <Skeleton className="rounded-xl h-[245px]" />
            <Skeleton className="rounded-xl h-[245px]" />
            <Skeleton className="rounded-xl h-[245px]" />
            <Skeleton className="rounded-xl h-[245px]" />
          </div>
        </div>
      );

    case "budgets":
      return (
        <div className="w-full flex flex-col gap-8">
          <div className="flex justify-between items-center w-full">
            <Skeleton className="w-1/4 h-14 rounded-xl" />
            <Skeleton className="w-1/5 h-12 rounded-xl" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full h-32">
            <Skeleton className="h-full rounded-xl" />
            <Skeleton className="h-full rounded-xl" />
            <Skeleton className="h-full rounded-xl" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            <Skeleton className="rounded-xl h-[245px]" />
            <Skeleton className="rounded-xl h-[245px]" />
            <Skeleton className="rounded-xl h-[245px]" />
            <Skeleton className="rounded-xl h-[245px]" />
          </div>
        </div>
      );

    default:
      return <Loader2 className="animate-spin" size={28} />;
  }
};

const DashboardView = () => {
  const { user } = useUserStore();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tabId = queryParams.get("tab") ?? "summary";
  const activeTab = useMemo(() => tabId, [tabId]);
  const ComponentView = useMemo(() => tabsViews[tabId], [tabId]);
  const navigate = useNavigate();

  const handleTabChange = (tabId: string) => {
    navigate(`/dashboard?tab=${tabId}`);
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="grow">
        <div className="mt-24 px-8 md:px-12 flex flex-col gap-6 min-h-screen">
          <p className="m-0 text-xl font-medium text-gray-600/55">
            Hi {user?.name}, welcome to your dashboard!
          </p>
          <CurrentBalanceCard />
          <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
          <Suspense fallback={SkeletonLoading(activeTab)}>
            {ComponentView && <ComponentView />}
          </Suspense>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default DashboardView;
