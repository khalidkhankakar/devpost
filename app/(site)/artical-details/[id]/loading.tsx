import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 md:px-0 py-4 md:py-7">
      <article className="space-y-6">
        <div className="relative h-36 md:h-48 w-full overflow-hidden rounded-lg">
          <Skeleton className="object-contain w-full h-full" />
        </div>
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-sm font-medium"
              >
                <Skeleton className="w-4 h-4" />
                <Skeleton className="w-12 h-4" />
              </div>
            ))}
          </div>
          <Skeleton className="w-full h-8 md:h-10" />
        </div>

        <div className="prose prose-lg dark:prose-invert space-y-4">
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} className="w-full h-4 md:h-6" />
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="w-8 h-8 rounded-full" />
            <div className="text-sm">
              <Skeleton className="w-24 h-4" />
              <Skeleton className="w-32 h-3 mt-1" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="w-8 h-8" />
          </div>
        </div>
        <div className="border-t pt-6 space-y-4">
          <Skeleton className="w-32 h-5" />
          {[...Array(2)].map((_, index) => (
            <Skeleton key={index} className="w-full h-4 md:h-6" />
          ))}
        </div>
      </article>
    </div>
  );
}
