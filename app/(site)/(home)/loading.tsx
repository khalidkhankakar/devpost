import { HeartIcon, MessageCircleIcon } from "lucide-react";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Loading = () => {
  return (
    <main className="flex items-center flex-col gap-y-2 w-full">
      <div className="flex my-3 md:my-5 w-full justify-around items-center">
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-10 w-20" />
      </div>
{
    [1,2,3].map((i)=>(
        <div key={i} className="space-y-2">
            <CardSkeleton />
        </div>
    ))
}
    </main>
  );
};

export default Loading;

export function CardSkeleton() {
  return (
    <Card className="w-full max-w-md md:max-w-xl lg:max-w-3xl">
      <CardContent className="grid gap-6 p-6 md:p-8">
        <div className="space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-20" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6 border">
              <AvatarImage src="/placeholder-user.jpg" alt="John Doe" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-20" />
          <div className="flex items-center gap-1">
            <MessageCircleIcon className="w-4 h-4" />
            <Skeleton className="h-4 w-8" />
          </div>
          <div className="flex items-center gap-1">
            <HeartIcon className="w-4 h-4" />
            <Skeleton className="h-4 w-8" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
