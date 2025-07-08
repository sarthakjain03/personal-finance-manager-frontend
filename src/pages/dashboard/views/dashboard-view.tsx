import { useState, lazy, JSX, Suspense } from "react";
import Navbar from "@/app/layout/navbar";
import Footer from "@/app/layout/footer";
import useResponsive from "@/hooks/use-responsive";
import Navigation from "../components/navigation";
import CurrentBalanceCard from "../components/current-balance";

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
        <div className="mt-24 px-8 md:px-12 flex flex-col gap-6">
          <CurrentBalanceCard />
          <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
          <Suspense fallback={<div>Loading Tab View...</div>}>
            {ComponentView && <ComponentView />}
          </Suspense>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default DashboardView;
