import { Receipt } from "lucide-react";

const Footer = ({ isLandingView = false }) => {
  return (
    <footer className={`flex flex-col gap-20 justify-between items-center ${isLandingView ? "pt-32 lg:pt-48" : "pt-18"} pb-5 md:pb-8 px-8 md:px-12 w-full bg-bgMain`}>
      <div className="flex flex-wrap justify-between gap-6 md:gap-0 w-full">
        <div className="flex gap-2 items-center">
          <Receipt color="#2A8E9E" size={24} />
          <p className="text-2xl font-semibold text-sidemain w-full md:w-1/2">
            FinSphere
          </p>
        </div>
        <div className="w-full md:w-1/2 flex flex-wrap justify-between md:justify-around gap-6 md:gap-0">
          <div className="flex flex-col gap-3 text-sidemain">
            <p className="font-medium">LINKS</p>
            <div className="flex flex-col gap-2 text-sm">
              <a href="mailto:sarthakjain.tech@gmail.com">Support</a>
              <a href="https://x.com/jsarthak110" target="_blank">Creator's X (Twitter)</a>
              <a href="https://www.linkedin.com/in/sarthakjain-coder-developer/" target="_blank">Creator's LinkedIn</a>
              <a href="https://www.sarthakja.in/" target="_blank">Creator's Website</a>
            </div>
          </div>
          <div className="flex flex-col gap-3 text-sidemain">
            <p className="font-medium">LEGAL</p>
            <div className="flex flex-col gap-2 text-sm">
              <a href="/terms-of-service">Terms of Service</a>
              <a href="/privacy-policy">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-bgSecondary text-sm font-medium">
        Copyright © FinSphere 2025. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
