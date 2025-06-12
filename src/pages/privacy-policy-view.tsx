import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicyView = () => {
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
          <h1 className="text-3xl font-semibold">Privacy Policy</h1>
          <p>Effective Date: July 01, 2025</p>
          <p>
            Welcome to FinSphere! This Privacy Policy explains how we collect,
            use, and protect your personal information. By using our website,
            you agree to the terms of this Privacy Policy.
          </p>
          <p>1. Information We Collect</p>
          <p>We Collect the following information:</p>
          <p className="ml-4">
            Personal Information: Your name and email address.
          </p>
          <p>2. Purpose of Data Collection</p>
          <p>
            We collect your data solely for the purpose storing and retrieving
            user-specific data to display on your dashboard after you sign-up.
          </p>
          <p>3. Data Sharing</p>
          <p>We do not share your personal information with third parties.</p>
          <p>4. Updates to this Policy</p>
          <p>We may update this Privacy Policy from time to time.</p>
          <p>5. Contact Us</p>
          <p>
            If you have any questions or concerns about this Privacy Policy,
            please contact us at sarthakjain.tech@gmail.com.
          </p>
          <p>
            By using FinSphere, you agree to the terms outlined in this Privacy
            Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyView;
