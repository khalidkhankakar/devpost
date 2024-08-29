
import { Skeleton } from "@/components/ui/skeleton"

export default function loading() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto px-4 md:px-6 py-12">
      <div className="grid gap-6 md:grid-cols-[200px_1fr] items-start">
        <div className="flex flex-col gap-4">
          <div className="relative h-[200px] w-[200px] rounded-full overflow-hidden">
            <Skeleton className="h-full w-full" />
          </div>
          <div className="relative h-[150px] rounded-lg overflow-hidden">
            <Skeleton className="h-full w-full" />
          </div>
        </div>
        <div className="grid gap-2">
          <Skeleton className="h-8 w-[200px]" />
          <div className="text-muted-foreground">
            <Skeleton className="h-4 w-[150px]" />
            <span className="mx-2">•</span>
            <Skeleton className="h-4 w-[150px]" />
          </div>
          <div className="text-sm">
            <Skeleton className="h-4 w-[150px]" />
          </div>
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
      <div className="grid gap-8">
        <div>
          <Skeleton className="h-6 w-[150px] mb-4" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="group">
              <div className="relative h-[200px] rounded-lg overflow-hidden">
                <Skeleton className="h-full w-full" />
              </div>
              <div className="mt-2">
                <Skeleton className="h-5 w-[200px]" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
            <div className="group">
              <div className="relative h-[200px] rounded-lg overflow-hidden">
                <Skeleton className="h-full w-full" />
              </div>
              <div className="mt-2">
                <Skeleton className="h-5 w-[200px]" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
            <div className="group">
              <div className="relative h-[200px] rounded-lg overflow-hidden">
                <Skeleton className="h-full w-full" />
              </div>
              <div className="mt-2">
                <Skeleton className="h-5 w-[200px]" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </div>
        </div>
        <div>
          <Skeleton className="h-6 w-[150px] mb-4" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="group">
              <div className="relative h-[200px] rounded-lg overflow-hidden">
                <Skeleton className="h-full w-full" />
              </div>
              <div className="mt-2">
                <Skeleton className="h-5 w-[200px]" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
            <div className="group">
              <div className="relative h-[200px] rounded-lg overflow-hidden">
                <Skeleton className="h-full w-full" />
              </div>
              <div className="mt-2">
                <Skeleton className="h-5 w-[200px]" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
            <div className="group">
              <div className="relative h-[200px] rounded-lg overflow-hidden">
                <Skeleton className="h-full w-full" />
              </div>
              <div className="mt-2">
                <Skeleton className="h-5 w-[200px]" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}