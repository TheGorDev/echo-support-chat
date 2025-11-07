'use client'

import React from 'react'
import { useAtomValue } from 'jotai'
import WigetAuthScreen from '@/modules/widget/ui/screens/widget-auth-screen'
import { screenAtom } from '@/modules/widget/atoms/widget-atoms'

interface Props {
    oranizationId: string
}

export const WidgetView = ({oranizationId}: Props) => {
  const screen = useAtomValue(screenAtom);
  const screenComponents = {
    "error": <p>TODO: Error</p>,
    "loading": <p>TODO: Loading</p>,
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
