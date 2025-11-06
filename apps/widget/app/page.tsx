'use client';

import { WidgetView } from '@/modules/widget/ui/views/widget-view';
import { use } from 'react';

interface Props {
  searchParams: Promise<{oranizationId: string}>
}

export default function Page({searchParams}: Props) {
  const {oranizationId} = use(searchParams)
  return (
    <WidgetView oranizationId={oranizationId}/>
  )
}
