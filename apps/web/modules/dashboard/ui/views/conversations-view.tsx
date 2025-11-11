import React from 'react'
import Image from 'next/image'


export const ConversationsView = () => {
  return (
    <div className='flex h-screen flex-1 flex-col gap-y-4 bg-muted'>
        <div className="flex flex-1 items-center justify-center gap-x-2">
            <Image alt="logo" height={80} width={80} src="/logo.svg"/>
            <p className="font-semibold text-lg text-accent">Echo</p>
        </div>
    </div>
  )
}
