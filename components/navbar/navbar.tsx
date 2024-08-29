import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import MobileNav from "./mobile-nav";
import GlobalSearch from "../search/global-search";

export default function Component() {
  return (
    <header className="flex sticky z-50 bg-white top-0 h-16 w-full items-center justify-between border-b px-4 sm:px-6">
      <div className="flex items-center gap-4 md:w-1/2">
        <MobileNav />
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-xl md:font-bold md:text-2xl "
          prefetch={false}
        >
          DevPost
        </Link>
        <GlobalSearch />
      </div>

      {/* TODO: make it efficient */}
      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
