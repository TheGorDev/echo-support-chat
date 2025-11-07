'use client'

import React from 'react'
// import WidgetFooter from '@/modules/widget/ui/components/widget-footer'
import WigetAuthScreen from '@/modules/widget/ui/screens/widget-auth-screen'

interface Props {
    oranizationId: string
}

export const WidgetView = ({oranizationId}: Props) => {
  return (
    <main className='min-h-screen flex h-full w-full flex-col overflow-hidden rounded-xl vorder bg-muted'>
      <WigetAuthScreen />
      {/* <WidgetFooter /> */}
    </main>
  )
}
