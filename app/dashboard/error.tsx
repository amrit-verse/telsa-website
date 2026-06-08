"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4 animate-in fade-in duration-300">
      <div className="w-16 h-16 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h2 className="text-2xl font-serif font-bold text-primary">Something went wrong</h2>
      <p className="text-muted-foreground max-w-md">
        An error occurred while loading the dashboard data. Please try again or contact support if the issue persists.
      </p>
      <button 
        onClick={() => reset()}
        className="px-6 py-2 bg-primary text-primary-foreground font-medium rounded-sm hover:bg-primary/90 mt-4 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
