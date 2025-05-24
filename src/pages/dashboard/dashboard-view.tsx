import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Navbar from "@/app/layout/navbar";
import Footer from "@/app/layout/footer";
import { Button } from "@/components/ui/button";
import useResponsive from "@/hooks/use-responsive";
import Navigation from "./components/navigation";
import CurrentBalanceCard from "./components/current-balance";

const DashboardView = () => {
  const { isMobile } = useResponsive();
  const [activeTab, setActiveTab] = useState("summary");

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
        Dashboard View
      </div>
      <Footer />
    </main>
  );
};

export default DashboardView;
