import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <Skeleton className="h-10 w-64 mb-2 rounded-sm" />
        <Skeleton className="h-5 w-96 rounded-sm" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-32 w-full rounded-sm" />
        ))}
      </div>

      <Skeleton className="h-64 w-full rounded-sm" />
    </div>
  );
}
