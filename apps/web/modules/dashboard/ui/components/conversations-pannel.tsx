'use client'

import React from 'react'

import {
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectContent,
    Select
} from "@workspace/ui/components/select"
import {ScrollArea} from "@workspace/ui/components/scroll-area"

import { ArrowRightIcon, ArrowUpIcon, CheckIcon, CornerUpLeftIcon, ListIcon } from 'lucide-react'
import { usePaginatedQuery } from 'convex/react'
import { api } from '@workspace/backend/_generated/api'
import { getCountryFromTimezone, getCountryFlag  } from '@/lib/country-utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {formatDistanceToNow} from "date-fns"
import { cn } from '@workspace/ui/lib/utils'
import {DicebearAvatar} from "@workspace/ui/components/dicebear-avatar"
import {ConversationStatusIcon} from "@workspace/ui/components/conversation-status-icon"
import { useAtom, useAtomValue, useSetAtom } from 'jotai/react'
import { statusFilterAtom } from '@/modules/dashboard/atoms'
import {useInfiniteScroll} from "@workspace/ui/hooks/use-infinite-scroll"
import {InfiniteScrollTrigger} from "@workspace/ui/components/infinite-scroll-trigger"
import { Skeleton } from '@workspace/ui/components/skeleton'


export const ConversationsPannel = () => {
    
    const [statusFilter, setStatusFilter] = useAtom(statusFilterAtom)

    const pathName = usePathname();

    const conversations = usePaginatedQuery(
        api.private.conversations.getMany,
        {
            status: statusFilter === "all" ? undefined : statusFilter 
        },
        {
            initialNumItems: 10
        }
    )

    const { topElementRef, handleLoadMore, canLoadMore, isLoadingMore , isLoadingFirsPage} = useInfiniteScroll({
    status: conversations.status,
    loadMore: conversations.loadMore,
    loadSize: 10,
    observeEnabled: true
  })


  return ( 
    <div className='flex h-full w-full flex-col bg-background text-sidebar-foreground'>
        <div className='flex flex-col gap-3.5 border-b p-2'>
            <Select
                defaultValue='all'
                value={statusFilter}
                onValueChange={(value)=>setStatusFilter(
                    value as "unresolved" | "resolved" | "escalated" | "all"
                )}
            >
                <SelectTrigger className='h-8 border-none px-1.5 shadow-none ring-0 hover:bg-accent hover:text-accent-foreground focuse-visible:ring-0'>
                    <SelectValue placeholder="filter"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value='all'>
                        <div className='flex items-center gap-2'>
                            <ListIcon className='size-4' />
                            <span>All</span>
                        </div>
                    </SelectItem>
                    <SelectItem value='unresolved'>
                        <div className='flex items-center gap-2'>
                            <ArrowRightIcon className='size-4' />
                            <span>Unresolved</span>
                        </div>
                    </SelectItem>
                    <SelectItem value='escalated'>
                        <div className='flex items-center gap-2'>
                            <ArrowUpIcon className='size-4' />
                            <span>Escalated</span>
                        </div>
                    </SelectItem>
                    <SelectItem value='resolved'>
                        <div className='flex items-center gap-2'>
                            <CheckIcon className='size-4' />
                            <span>Resolved</span>
                        </div>
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>
        {
            isLoadingFirsPage ? (
                <SkeletonConversations />
            ) : (                
                <ScrollArea className='max-h-[calc[100vh-53px]]'>
                    <div className="flex flex-col flex-1 w-full text-sm">
                        {
                            conversations.results.map(conversation => {
                                const lastMessageFromOperator = conversation.lastMessage?.message?.role === "user"
                                const country = getCountryFromTimezone(conversation.contactSession.metadata?.timezone)
                                const countryFlagUrl = country?.code ? getCountryFlag(country?.code) : undefined
                                return (
                                    <Link 
                                        href={`/conversations/${conversation._id}`}
                                        key={conversation._id}
                                        className={cn("relative flex cursor-pointer items-start gap-3 border-b p-4 py-5 text-sm leading-tight hover:bg-accent hover:text-accent-foreground", pathName === `/conversations/${conversation._id}` && "bg-accent text-accent-foreground", lastMessageFromOperator && "bg-accent/50")}
                                    >
                                        <div className={cn("-translate-y-1/2 absolute top-1/2 left-0 h-[64%] w-1 rounded-r-full bg-natural-300 opacity-0 transition-opacity", pathName === `/conversations/${conversation._id}` && "opacity-100")} />
                                        <DicebearAvatar 
                                            seed={conversation.contactSession._id}
                                            badgeImageUrl={countryFlagUrl}
                                            size={40}
                                            className='shrink-0'
                                        />
                                        <div className='flex-1'>
                                            <div className='flex w-full items-center gap-2'>
                                                <span className='truncate font-bold'>{conversation.contactSession.name}</span>
                                                <span className='ml-auto hsrink-0 text-muted-foreground text-xs'>{formatDistanceToNow(conversation._creationTime)}</span>
                                            </div>
                                            <div className='mt-1 flex items-center justify-between gap-2'>
                                                <div className='flex w-0 grow items-center gap-1'>
                                                    {lastMessageFromOperator && (<CornerUpLeftIcon className='size-3 shrink-0 text-muted-foreground'/>)}
                                                    <span className={cn(
                                                        "line-clamp-1 text-xs",
                                                        lastMessageFromOperator ? "font-bold dark:font-white!" : "text-muted-foreground"
                                                    )}>
                                                        {conversation.lastMessage?.text}
                                                    </span>
                                                </div>
                                                <ConversationStatusIcon status={conversation.status}/>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    <InfiniteScrollTrigger 
                        canLoadMore={canLoadMore}
                        isLoadingMore={isLoadingMore}
                        onLoadMore={handleLoadMore}
                        ref={topElementRef}
                    />
                    </div>
                </ScrollArea>
            )
        }
    </div>
  )
}

export const SkeletonConversations = () => {
    return (
        <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-auto">
            <div className="relative flex w-full-min-w-0 flex-col p-2">
                <div className="w-full space-y-2">
                    {
                        Array.from({length: 10}).map((_,index)=>(
                            <div className="flex items-start gap-3 rounded-lg p-4" key={index}>
                                <Skeleton className='h-10 w-10 shrink-0 rounded-full'/>
                                <div className="min-w-0 flex-1">
                                    <div className='flex w-full items-center gap-2'>
                                        <Skeleton className='h-4 w-24'/>
                                        <Skeleton className='ml-auto h-3 w-12 shrink-0'/>
                                    </div>
                                    <div className="mt-2">
                                        <Skeleton className='h-3 w-full'/>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}