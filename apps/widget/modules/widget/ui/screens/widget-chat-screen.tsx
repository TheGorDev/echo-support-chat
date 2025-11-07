"use client";

import WidgetHeader from "@/modules/widget/ui/components/widget-header";
import { Button } from "@workspace/ui/components/button";
import { useAtomValue, useSetAtom } from "jotai";
import { ArrowLeftIcon, MenuIcon } from "lucide-react";
import { contactSessionIdAtomFamily, conversationIdAtom, organizationIdAtom, screenAtom } from "@/modules/widget/atoms/widget-atoms";
import { useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";

export const WidgetChatScreen = () => {
  const setScreen = useSetAtom(screenAtom)
  const setConversationId = useSetAtom(conversationIdAtom)
  const conversationId = useAtomValue(conversationIdAtom)
  const organizationId = useAtomValue(organizationIdAtom)
  const contactSessionId = useAtomValue(contactSessionIdAtomFamily(organizationId || ""))
  const queryArgs =
  conversationId != null && contactSessionId != null
    ? { conversationId: conversationId, contactSessionId: contactSessionId }
    : "skip";
  const conversation = useQuery(api.public.conversations.getOne,queryArgs)
  const onBack = () => {
    setConversationId(null)
    setScreen("selection")
  }
  return (
    <>
      <WidgetHeader className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <Button
            size="icon"
            variant="transparent"
            onClick={onBack}
            className="cursor-pointer"
          >
            <ArrowLeftIcon />
          </Button>
          <p>Chat</p>
        </div>
        <Button
          size="icon"
          variant="transparent"
          className="cursor-pointer"
        >
          <MenuIcon />
        </Button>
      </WidgetHeader>

      <div className="flex flex-1 flex-col gap-y-4 p-4">
          {JSON.stringify(conversation, null,2)}
      </div>
    </>
  );
};
