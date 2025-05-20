import { useEffect } from "react";
import { motion } from "motion/react";
import Navbar from "@/app/layout/navbar";
import Footer from "@/app/layout/footer";
import { Button } from "@/components/ui/button";
import useResponsive from "@/hooks/use-responsive";

const DashboardView = () => {
  const { isMobile } = useResponsive();

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
      <div className="mt-24">
        Dashboard View
      </div>
      <Footer />
    </main>
  );
};

export default DashboardView;
