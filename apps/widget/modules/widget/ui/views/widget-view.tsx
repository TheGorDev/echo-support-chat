'use client'

import React from 'react'
import { useAtomValue } from 'jotai'
import WigetAuthScreen from '@/modules/widget/ui/screens/widget-auth-screen'
import { screenAtom } from '@/modules/widget/atoms/widget-atoms'
import { WidgetErrorScreen } from '@/modules/widget/ui/screens/widget-error-screen'
import { WidgetLoadingScreen } from '@/modules/widget/ui/screens/widget-loading-screen'

interface Props {
    oranizationId: string
}

export const WidgetView = ({oranizationId}: Props) => {
  const screen = useAtomValue(screenAtom);
  const screenComponents = {
    "error": <WidgetErrorScreen />,
    "loading": <WidgetLoadingScreen organizationId={oranizationId}/>,
    "selection": <p>TODO: Selection</p>,
    "voice": <p>TODO: Voice</p>,
    "auth": <WigetAuthScreen />,
    "inbox": <p>TODO: Inbox</p>,
    "chat": <p>TODO: Chat</p>,
    "contacts": <p>TODO: contacts</p>
  }
  return (
    <main className='min-h-screen flex h-full w-full flex-col overflow-hidden rounded-xl vorder bg-muted'>
      {screenComponents[screen]}
    </main>
  )
}
