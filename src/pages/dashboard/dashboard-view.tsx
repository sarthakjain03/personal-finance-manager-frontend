import { useEffect } from "react";
import { motion } from "motion/react";
import Navbar from "@/app/layout/navbar";
import Footer from "@/app/layout/footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
      <div className="mt-24 px-8 md:px-12">
        <div className="flex justify-center">
          <Tabs defaultValue="expenses" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="expenses" className="cursor-pointer">Expenses</TabsTrigger>
              <TabsTrigger value="goals" className="cursor-pointer">Goals</TabsTrigger>
              <TabsTrigger value="budgets" className="cursor-pointer">Budgets</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        Dashboard View
      </div>
      <Footer />
    </main>
  );
};

export default DashboardView;
