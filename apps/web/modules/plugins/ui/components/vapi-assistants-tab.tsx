'use client'

import React from 'react'
import { BotIcon } from 'lucide-react'
import { toast } from 'sonner'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@workspace/ui/components/table"
import { useVapiAssistants } from '@/modules/plugins/ui/hooks/use-vapi-data'
import { Shimmer } from '@workspace/ui/components/ai/shimmer'

const VapiAssistantsTab = () => {

    const {data: assistants, isLoading} = useVapiAssistants()


  return (
    <div className='border-t bg-background'>
      <Table>
        <TableHeader>
            <TableRow>
                <TableHead className='px-6 py-4'>
                    Assistant
                </TableHead>
                <TableHead className='px-6 py-4'>
                    Model
                </TableHead>
                <TableHead className='px-6 py-4'>
                    First message
                </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {(()=>{
                if(isLoading) {
                    return (
                        <TableRow>
                            <TableCell colSpan={3} className='px-6 py-8 text-center text-muted-foreground'>
                                <Shimmer>
                                    Loading assistants...
                                </Shimmer>
                            </TableCell>
                        </TableRow>
                    )
                }
                if(!assistants.length) {
                    return (
                        <TableRow>
                            <TableCell colSpan={3} className='px-6 py-8 text-center text-muted-foreground'>
                                    No assistants configured
                            </TableCell>
                        </TableRow>
                    )
                }

                return assistants.map(assistant => (
                    <TableRow className='hover:bg-muted/50' key={assistant.id}>
                        <TableCell className='px-6 py-4'>
                            <div className="flex items-center gap-3">
                                <BotIcon className='size-4 text-muted-foreground'/>
                                <span>
                                    {assistant.name || "Unnamed"}
                                </span>
                            </div>
                        </TableCell>
                        <TableCell className='px-6 py-4'>
                            <span className='text-muted-foreground text-sm'>
                                {assistant.model?.model || "Not configured"}
                            </span>
                        </TableCell>
                        <TableCell className='px-6 py-4 max-w-xs'>
                            <pattern className='text-sm truncate line-clamp-1 text-muted-foreground'>
                                {assistant.firstMessage || "No greeting configured"}
                            </pattern>
                        </TableCell>
                    </TableRow>
                ))
            })()}
        </TableBody>
      </Table>
    </div>
  )
}

export default VapiAssistantsTab
