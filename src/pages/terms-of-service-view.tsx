import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const TermsOfServiceView = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex justify-center py-6">
      <div className="w-full max-w-[700px] flex flex-col gap-8">
        <button
          className="flex items-center gap-4 border cursor-pointer w-fit px-5 py-2 rounded-xl shadow hover:bg-bgMain/30"
          onClick={handleBackClick}
        >
          <ArrowLeft size={20} color="#2A8E9E" />
          <span className="text-sm font-medium">Back</span>
        </button>
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-semibold">Terms of Service</h1>
          <p>Effective Date: July 01, 2025</p>
          <p>
            Welcome to FinSphere! These Terms of Service ("Terms") govern your
            use of our website and services. By accessing or using our platform,
            you agree to these Terms.
          </p>
          <p>1. Overview</p>
          <p>
            FinSphere is a platform that allows you to track your expenses, set
            financial goals, and create a budget. It does not collect any
            personal bank related information from you.
          </p>
          <p>2. User Data</p>
          <p>We collect your name and email as part of our service.</p>
          <p>3. Modifications</p>
          <p>We may update the Terms of Service from time to time.</p>
          <p>4. Contact Us</p>
          <p>
            If you have any questions or concerns about this Privacy Policy,
            please contact us at sarthakjain.tech@gmail.com.
          </p>
          <p>
            By using FinSphere, you acknowledge and agree to these Terms.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServiceView;
