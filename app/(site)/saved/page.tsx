import PostCard from "@/components/card/post-card";
import NoResult from "@/components/shared/no-result";
import { getUserByClerkId } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const page = async () => {
  const { userId } = auth();
  let mongoCurrentUser: any;
  if (userId) {
    mongoCurrentUser = await getUserByClerkId(userId);
  }
  if (!mongoCurrentUser || !userId) redirect("/sign-in");

  return (
    <main className="flex items-center flex-col gap-y-2 w-full mb-32">
      {!mongoCurrentUser?.saved || mongoCurrentUser?.saved.lenght <= 0 ? (
        <NoResult msg="There is no saved Artical" />
      ) : (
        mongoCurrentUser?.saved.map((post: any) => (
          <PostCard
            key={post._id}
            post={JSON.stringify(post)}
            mongoCurrentUser={JSON.stringify(mongoCurrentUser)}
          />
        ))
      )}
    </main>
  );
};

export default page;
