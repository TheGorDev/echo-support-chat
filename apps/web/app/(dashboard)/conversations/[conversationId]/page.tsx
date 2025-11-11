'use client'

import { ConversationIdView } from '@/modules/dashboard/ui/views/conversationId-view';
import { Id } from '@workspace/backend/_generated/dataModel';
import React from 'react'
import { useParams } from 'next/navigation';


interface PageProps {
  params: {
    conversationId: string;
  };
}

// const ConversationPage: React.FC<PageProps> = ({params}) => {
//   const {conversationId} = params;
const ConversationPage= () => {
const params = useParams() as { conversationId?: string };
  const conversationId = params.conversationId;

  if (!conversationId) return <div>No conversationId</div>;
  return (
    <ConversationIdView conversationId={conversationId as Id<"conversations">} />
  )
}

export default ConversationPage
