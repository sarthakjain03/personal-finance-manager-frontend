import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { TooltipProvider } from "@/components/ui/tooltip";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <Suspense fallback={
            <div className="h-screen w-screen flex justify-center items-center">
                <p className="text-xl font-semibold">Loading...</p>
            </div>
        }>
            <ErrorBoundary FallbackComponent={() => <div>Error</div>}>
                <TooltipProvider>
                    {children}
                </TooltipProvider>
            </ErrorBoundary>
        </Suspense>
    );
};

export default AppProvider;