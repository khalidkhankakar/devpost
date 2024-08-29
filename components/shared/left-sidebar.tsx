'use client'
import { navLinks } from '@/utils/constant'
import { SignedIn, SignedOut, useAuth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const LeftSidebar = () => {
  const pathname = usePathname()
  const {userId} = useAuth();
  
  return (
    <aside className="hidden h-screen overflow-y-auto  border-r bg-muted/40 md:block">
    <div className="flex h-full  flex-col justify-between gap-4 p-4">
      <nav className="space-y-2">
        {
          navLinks.slice(0,4).map((item)=>(
            <Link
            href={item.link}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary ${pathname===item.link? 'bg-muted text-primary':''} `}
            prefetch={false}
            key={item.link}
          >
            {/* TODO: render the link icon */}
            <Image src={item.icon} width={30} height={30} alt={item.name} className='w-6' />
            {item.name}
          </Link>
          ))
        }
      </nav>
      <nav className=" space-y-2 mb-20">
        <SignedOut>
        {
          navLinks.slice(5,7).map((item)=>(
            <Link
            href={item.link}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary ${pathname===item.link? 'bg-muted text-primary':''} `}
            prefetch={false}
            key={item.link}
          >
            {/* TODO: render the link icon */}
            <Image src={item.icon} width={30} height={30} alt={item.name} className='w-6' />
            {item.name}
          </Link>
          ))
        }  
        </SignedOut>
        <SignedIn>
        <Link
            href={`/profile/${userId}`}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary ${pathname==='/profile'? 'bg-muted text-primary':''} `}
            prefetch={false}
          >
            {/* TODO: render the link icon */}
            <Image src={'/icons/profile.svg'} width={30} height={30} alt={'profile'} className='w-6' />
            Profile
          </Link>
      </SignedIn>

      </nav>
    </div>
  </aside>
  )
}

export default LeftSidebar
