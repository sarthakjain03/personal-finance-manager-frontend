import { motion } from "motion/react";
import Navbar from "@/app/layout/navbar";

const colorScheme = ['#2A8E9E', '#E9F3F4', '#180D39', '#1D1E20']

const LandingPage = () => {
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
      <div className="bg-[#E9F3F4] shadow-md rounded-md">
        <section id="hero" className="container px-12 md:px-20 py-10 md:py-16 text-center mx-auto">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            <motion.h1
              variants={fadeInUp}
              className="text-2xl md:text-3xl font-poppins lg:text-4xl font-bold mb-4 leading-tight text-[#180D39]"
            >
              Smarter Personal Finance to Help You Build Real Wealth
              <br />
              No Bank Links - No Stress
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-base md:text-lg lg:text-xl font-poppins text-[#1D1E20] max-w-4xl mb-6 mx-auto"
            >
              Your Path to Lasting Wealth Starts Here. Track expenses, set goals, and reduce stress — no sensitive data required.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex justify-center space-x-4"
            >
              {/* <Button variant="contained" size={isLarge ? "large" : "small"} onClick={() => setOpenModal(true)}>
                Start Analysing
              </Button>
              <Button variant="outlined" size={isLarge ? "large" : "small"}>
                Watch Demo
              </Button> */}
            </motion.div>
          </motion.div>
          {/* Add Dashboard Image or demo video here */}
        </section>
      </div>
    </main>
  );
};

export default LandingPage;
