import { useState, lazy, JSX, Suspense } from "react";
import Navbar from "@/app/layout/navbar";
import Footer from "@/app/layout/footer";
import useResponsive from "@/hooks/use-responsive";
import Navigation from "../components/navigation";
import CurrentBalanceCard from "../components/current-balance";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

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
  const { isMobile } = useResponsive();
  const [activeTab, setActiveTab] = useState("summary");
  const [ComponentView, setComponentView] = useState<React.LazyExoticComponent<
    () => JSX.Element
  > | null>(tabsViews.summary);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setComponentView(tabsViews[tabId]);
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="grow">
        <div className="mt-24 px-8 md:px-12 flex flex-col gap-6 min-h-screen">
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
