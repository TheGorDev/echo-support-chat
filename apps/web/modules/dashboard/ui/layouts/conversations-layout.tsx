import React from 'react'
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@workspace/ui/components/resizable"
import { ConversationsPannel } from '@/modules/dashboard/ui/components/conversations-pannel'

export const ConversationsLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <ResizablePanelGroup className='h-fuul flex-1' direction='horizontal'>
        <ResizablePanel defaultSize={30} maxSize={30} minSize={20}>
            <ConversationsPannel />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className='h-full' defaultSize={70}>
            {children}
        </ResizablePanel>
    </ResizablePanelGroup>
  )
}
