import {  getUserByClerkId } from "@/lib/actions/user.action";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import PostCard from "@/components/card/post-card";
import { redirect } from "next/navigation";

export default async function page({
  params,
}: {
  params: { id: string };
}) {
  const mongoUser = await getUserByClerkId(params.id);
  if(!mongoUser){
    return redirect('/')
  }
  console.log(mongoUser)
  return (
    <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto px-4 md:px-6 py-12">
      <div className="grid gap-6 md:grid-cols-[200px_1fr] items-start">
        <div className="flex flex-col gap-4">
          <div className="relative h-[200px] w-[200px] rounded-full overflow-hidden">
            <Image
              src={mongoUser.profileUrl}
              alt="Profile Picture"
              width={200}
              height={200}
              className="object-cover"
              style={{ aspectRatio: "200/200", objectFit: "cover" }}
              priority
            />
          </div>
          {mongoUser?.coverImg && (
            <div className="relative h-[150px] rounded-lg overflow-hidden">
              <Image
                src={mongoUser.coverImg}
                alt="Cover Image"
                width={800}
                height={150}
                className="object-cover w-full h-full"
                style={{ aspectRatio: "800/150", objectFit: "cover" }}
              />
            </div>
          )}
        </div>
        <div className="grid gap-2">
          <h1 className="text-3xl font-bold">{mongoUser.name}</h1>
          <div className="text-muted-foreground">
            <span>{mongoUser?.email}</span>
            {mongoUser?.location && (
              <>
                <span className="mx-2">•</span>
                <span>{mongoUser?.location}</span>
              </>
            )}
          </div>

          {mongoUser?.portfolioLink && (
            <div className="text-sm">
              <Link
                href={mongoUser?.portfolioLink}
                target="_blank"
                className="underline"
                prefetch={false}
              >
                {mongoUser?.portfolioLink}
              </Link>
            </div>
          )}

          {mongoUser?.bio && (
            <p className="text-muted-foreground">{mongoUser?.bio}</p>
          )}
          <Button variant={"secondary"}>
            <Link href={`/profile/edit/${params.id}`}></Link>
            Edit Profile
          </Button>
        </div>
      </div>
      <div className="grid gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Posts</h2>
          {/* <PostTab userId={String(mongoUser._id)} /> */}
          {
            mongoUser?.userArtical?.length <= 0 ?
            (
              <div>
              <p>You have no liked Artical yet.</p>
              <Link href={"/"}>Like Post</Link>
            </div>
            ):(
              mongoUser?.userArtical?.map((post:any)=>(
                <PostCard post={JSON.stringify(post)} mongoCurrentUser={JSON.stringify(mongoUser)} key={post._id} />
              ))
            )
          }
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Liked Posts</h2>
          {/* {mongoUser?.liked.length <= 0 ? (
            <div>
              <p>You have no liked Artical yet.</p>
              <Link href={"/"}>Like Post</Link>
            </div>
          ) : (
            <ShowPost postArr={mongoUser?.liked} />
          )} */}
        </div>
      </div>
    </div>
  );
}
