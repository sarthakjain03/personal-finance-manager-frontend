import { motion } from "motion/react";
import Navbar from "@/app/layout/navbar";
import Footer from "@/app/layout/footer";
import { Button } from "@/components/ui/button";
import useResponsive from "@/hooks/use-responsive";
import { Wallet, Sparkles, Target } from "lucide-react";
import useLanding from "@/pages/landing/use-landing";

const features = [
  {
    title: "Track Expenses",
    description:
      "Track your expenses and monitor your progress towards your financial goals.",
    icon: <Wallet size={36} color="#2A8E9E" />,
  },
  {
    title: "Goals and Budgets",
    description:
      "Set financial goals and budgets to help you stay on track and achieve your financial objectives.",
    icon: <Target size={36} color="#2A8E9E" />,
  },
  {
    title: "Comming Soon",
    description:
      "An AI Financial Advisor to help you make better financial decisions.",
    icon: <Sparkles size={36} color="#2A8E9E" />,
  },
];

const steps = [
  {
    title: "Open your account on our platform",
    description: "Sign up on FinSphere using your google account",
  },
  {
    title: "Add your objectives and expenses",
    description: "Input your expenses and set your financial budgets and goals",
  },
  {
    title: "Watch your wealth grow",
    description:
      "Visualizing your financial progress and making informed decisions",
  },
];

// TODO: complete the Terms of Service and Privacy Policy pages

const LandingPage = () => {
  const { isMobile } = useResponsive();
  const { handleSignIn } = useLanding();

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
      <Navbar isLandingView={true} />
      <div className="mt-16 md:mt-18">
        <section
          id="hero"
          className="px-8 md:px-20 pt-10 md:pt-16 text-center pb-52 bg-bgMain"
        >
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            <motion.h1
              variants={fadeInUp}
              className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight text-sidemain"
            >
              Build Real Wealth with Smart Personal Finance
              <br />
              No Bank Links Required
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-base md:text-lg lg:text-xl text-bgSecondary max-w-4xl mb-6 mx-auto"
            >
              Your Path to Lasting Wealth Starts Here. Track expenses, set
              goals, and reduce stress — no sensitive data required.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex justify-center space-x-4"
            >
              <Button
                className="bg-main cursor-pointer hover:bg-sidemain"
                size={isMobile ? "default" : "lg"}
                onClick={handleSignIn}
              >
                Get Started
              </Button>
            </motion.div>
          </motion.div>
        </section>
        {/* Add Dashboard Image or demo video here */}
        <section
          id="features"
          className="px-8 md:px-12 py-10 md:py-16 shadow-md rounded-lg mx-6 md:mx-16 relative -top-24 lg:-top-32 bg-white"
        >
          <div className="flex flex-col justify-center">
            <motion.p variants={fadeInUp} className="text-main text-xs">
              Money Management
            </motion.p>
            <div className="flex flex-wrap justify-between gap-4 md:gap-0 w-full">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl lg:text-4xl font-semibold text-bgSecondary leading-snug w-full md:w-1/2"
              >
                Take Control of your Finances Today
              </motion.h2>
              <motion.p variants={fadeInUp} className="w-full md:w-2/5 text-sm">
                FinSphere is a powerful financial management tool that helps
                reduce your financial stress and build real wealth. No sensitive
                data required.
              </motion.p>
            </div>
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerChildren}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
            >
              {features?.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="p-6 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="mb-4 inline-block">{feature.icon}</div>
                  <h3 className="text-md lg:text-xl text-bgSecondary font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm lg:text-base">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        <section
          id="steps"
          className="px-8 md:px-12 pt-10 md:pt-16 pb-12 md:pb-18 bg-sidemain"
        >
          <div className="flex flex-col justify-center">
            <motion.p variants={fadeInUp} className="text-main text-xs">
              Steps
            </motion.p>
            <div className="flex flex-wrap justify-between gap-4 md:gap-0 w-full">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl lg:text-4xl font-semibold leading-snug w-full text-white"
              >
                Three Simple Steps to Become Wealthy
              </motion.h2>
            </div>
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerChildren}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
            >
              {steps?.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="p-6 rounded-lg hover:shadow-md transition-shadow bg-[#0b3a4f] shadow-md"
                >
                  <div className="mb-2 inline-block text-6xl font-semibold">
                    <span className="bg-gradient-to-b from-white/70 to-transparent text-transparent bg-clip-text">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="text-md lg:text-xl font-medium mb-2 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 text-xs lg:text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        <section
          id="ai-feature"
          className="px-8 md:px-12 pt-14 pb-0 md:pt-24 text-center"
        >
          <div className="flex flex-col justify-center gap-6">
            <div className="flex flex-col justify-center gap-1">
              <motion.p variants={fadeInUp} className="text-main text-xs">
                AI Feature
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl lg:text-4xl font-semibold text-bgSecondary"
              >
                AI Financial Advisor (Comming Soon)
              </motion.h2>
            </div>
            <motion.p variants={fadeInUp} className="w-full text-sm">
              An AI powered financial advisor that helps you make better
              financial decisions whether it is a house, car, etc. Ask questions
              with some input and it will give you advice on how to save money,
              invest, and grow your wealth.
            </motion.p>
          </div>
        </section>
        <section
          id="try-now"
          className="px-8 md:px-12 py-10 md:py-16 shadow-md rounded-lg mx-6 md:mx-16 relative bg-sidemain top-24 lg:top-28"
        >
          <div className="flex flex-col justify-center">
            <motion.p variants={fadeInUp} className="text-main text-xs">
              Try It Now
            </motion.p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-0 w-full">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl lg:text-4xl font-semibold leading-snug w-full md:w-2/3 text-white"
              >
                Ready to Level Up your Financial Game?
              </motion.h2>
              <div className="flex justify-center items-center w-full md:w-1/3">
                <Button
                  className="bg-main cursor-pointer hover:bg-bgMain hover:text-bgSecondary"
                  size={isMobile ? "default" : "lg"}
                  onClick={handleSignIn}
                >
                  Start Now
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer isLandingView={true} />
    </main>
  );
};

export default LandingPage;
