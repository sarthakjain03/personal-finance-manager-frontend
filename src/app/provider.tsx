import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { googleClientId } from "@/lib/env";
import { Loader2 } from "lucide-react";
import { Analytics } from "@vercel/analytics/react";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen flex justify-center items-center">
          <Loader2 className="animate-spin" size={64} color="#2A8E9E" />
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={() => <div>Error</div>}>
        <GoogleOAuthProvider clientId={googleClientId}>
          <TooltipProvider>
            {children}
            <Analytics />
          </TooltipProvider>
        </GoogleOAuthProvider>
        <Toaster />
      </ErrorBoundary>
    </Suspense>
  );
};

export default AppProvider;
