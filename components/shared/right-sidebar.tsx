import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

const RightSidebar = () => {
  return (
    <aside className="hidden h-screen overflow-y-auto border-l bg-muted/40 lg:block">
    <div className="flex h-full flex-col gap-4 p-4">
      <div className="flex-1 space-y-2">
        <h2 className='text-xl font-semibold '>Top User</h2>

      <div className="flex flex-col items-center gap-2">
          <Avatar className="w-16 h-16">
            <AvatarImage src="/placeholder-user.jpg" alt="@jaredpalmer" />
            <AvatarFallback>JP</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <div className="font-medium">@jaredpalmer</div>
            <div className="text-sm text-muted-foreground">123 Contributions</div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Avatar className="w-16 h-16">
            <AvatarImage src="/placeholder-user.jpg" alt="@jaredpalmer" />
            <AvatarFallback>JP</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <div className="font-medium">@jaredpalmer</div>
            <div className="text-sm text-muted-foreground">123 Contributions</div>
          </div>
        </div>
        </div>
    </div>
  </aside>
  )
}

export default RightSidebar
