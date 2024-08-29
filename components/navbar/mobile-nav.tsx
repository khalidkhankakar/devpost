'use client'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks } from "@/utils/constant";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const pathname = usePathname()
  return (
    <div className="block md:hidden">
    <Sheet>
      <SheetTrigger asChild>
        <Menu />
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle className="text-xl">DevPost</SheetTitle>
          <SheetDescription>
          <div className="flex  h-screen flex-col justify-between gap-4 p-4">
      <nav className="space-y-2">
        {
          navLinks.slice(0,3).map((item)=>(
            <Link
            href={item.link}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary ${pathname===item.link? 'bg-muted text-primary':''} `}
            prefetch={false}
            key={item.link}
          >
            {/* TODO: render the link icon */}
            <Image src={item.icon} width={30} height={30} alt={item.name} className='w-4' />
            {item.name}
          </Link>
          ))
        }
      </nav>
      <nav className=" space-y-2 mb-20">
        <SignedOut>
        {
          navLinks.slice(4,7).map((item)=>(
            <Link
            href={item.link}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary ${pathname===item.link? 'bg-muted text-primary':''} `}
            prefetch={false}
            key={item.link}
          >
            {/* TODO: render the link icon */}
            <Image src={item.icon} width={30} height={30} alt={item.name} className='w-4' />
            {item.name}
          </Link>
          ))
        }  
        </SignedOut>
        <SignedIn>
        <Link
            href={'/profile'}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary ${pathname==='/profile'? 'bg-muted text-primary':''} `}
            prefetch={false}
          >
            {/* TODO: render the link icon */}
            Profile
            <Image src={'/icons/profile.svg'} width={30} height={30} alt={'profile'} className='w-6' />
          </Link>
      </SignedIn>

      </nav>
    </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
    </div>
  );
};

export default MobileNav;
