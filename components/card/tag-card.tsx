import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
const TagCard = ({ tagLink,name, tagLenght }: {tagLink:string; name: string; tagLenght: number }) => {
  return (
    <Card className="p-4 bg-muted rounded-lg">
      <CardContent className="flex flex-col items-center justify-center">
        <Link href={`/tags/${tagLink}`} className="text-2xl font-bold">{name}</Link>
        <div className="text-muted-foreground text-sm">{tagLenght} posts</div>
      </CardContent>
    </Card>
  );
};

export default TagCard;
