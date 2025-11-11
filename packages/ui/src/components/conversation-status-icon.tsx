import React from 'react'
import {ArrowRightIcon, ArrowUpIcon, CheckIcon} from "lucide-react"
import {cn} from "@workspace/ui/lib/utils"

interface ConversationStatusIconProps {
    status: "unresolved" | "escalated" | "resolved"
}

const statusConfig = {
    resolved: {
        icon: CheckIcon,
        bgColor: "bg-success"
    },
    unresolved: {
        icon: ArrowRightIcon,
        bgColor: "bg-destructive"
    },
    escalated: {
        icon: ArrowUpIcon,
        bgColor: "bg-primary"
    }
} as const

export const ConversationStatusIcon = ({status}: ConversationStatusIconProps) => {
    const config = statusConfig[status]
    const Icon = config.icon
  return (
    <div className={
        cn(
            "flex items-center justify-center rounded-full size-5 shrink-0",
            config.bgColor
        )
    }>
        <Icon className='size-3 stroke-3 text-white'/>
    </div>
  )
}
