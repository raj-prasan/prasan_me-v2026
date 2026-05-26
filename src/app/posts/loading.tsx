import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-4">
       

        <div className="space-y-2 pt-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
        </div>

        <Skeleton className="h-6 w-20 mt-6" />
      </div>

      {/* Posts */}
      {[1, 2].map((item) => (
        <div
          key={item}
          className="border-b border-border pb-8 space-y-5"
        >
          <div className="flex items-start gap-4">
            <Skeleton className="h-12 w-12 rounded-md" />

            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
              </div>

              <Skeleton className="h-6 w-64" />

              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/5" />
              </div>

              <div className="flex items-center justify-between pt-3">
                <div className="flex gap-2">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-24" />
                </div>

                <Skeleton className="h-9 w-20 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}