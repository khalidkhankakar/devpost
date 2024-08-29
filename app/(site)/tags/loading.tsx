import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; // Adjust the import path as needed

export default function loading() {
  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4 md:px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Tags</h1>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} className="p-4 animate-pulse bg-muted rounded-lg">
            <CardContent className="flex flex-col items-center justify-center">
              <Skeleton className="w-24 h-6 mb-4" />{" "}
              {/* Placeholder for tag name */}
              <Skeleton className="w-16 h-4" />{" "}
              {/* Placeholder for post count */}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
