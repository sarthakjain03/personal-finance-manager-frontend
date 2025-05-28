import { useEffect, useState } from "react";
import Navbar from "@/app/layout/navbar";
import Footer from "@/app/layout/footer";
import useResponsive from "@/hooks/use-responsive";
import Navigation from "./components/navigation";
import CurrentBalanceCard from "./components/current-balance";
import TransactionsTabView from "./transactions-tab";

const DashboardView = () => {
  const { isMobile } = useResponsive();
  const [activeTab, setActiveTab] = useState("summary");

  const renderContent = () => {
    switch (activeTab) {
      case "transactions":
        return <TransactionsTabView />;
      case "goals":
        return <></>;
      case "budgets":
        return <></>;
      default:
        return <></>;
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <main className="flex flex-col gap-4">
      <Navbar />
      <div className="mt-24 px-8 md:px-12 flex flex-col gap-6">
        <CurrentBalanceCard />
        <Navigation activeTab={activeTab} onTabChange={(tabId) => setActiveTab(tabId)} />
        {renderContent()}
      </div>
      <Footer />
    </main>
  );
};

export default DashboardView;
