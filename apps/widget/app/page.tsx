'use client';

import { useVapi } from '@/modules/widget/hooks/use-vapi';
import { Button } from '@workspace/ui/components/button';

/**
 * Renders a control panel for starting and ending a VAPI call and displays connection state and transcript.
 *
 * The UI includes Start Call and End Call controls and a status area that shows `isConnected`, `isConnecting`,
 * `isSpeaking`, and the current `transcript`.
 *
 * @returns The React element containing call controls and a status/transcript display.
 */
export default function Page() {

  const {isSpeaking, isConnected, isConnecting, transcript, startCall, endCall} = useVapi();

  return (
    <div className="flex flex-col items-center justify-center min-h-svh max-w-md mx-auto w-full">
      <Button onClick={startCall} variant="success" className="mb-4" disabled={isConnected || isConnecting}>
        Start Call
      </Button>
      <Button onClick={endCall} variant="destructive" className="mt-4" disabled={!isConnected && !isConnecting}>
        End Call
      </Button>
      <div className="mt-6 p-4 border rounded w-full min-h-[100px]">
        <p>isConnected: {`${isConnected}`}</p>
        <p>isConnecting: {`${isConnecting}`}</p>
        <p>isSpeaking: {`${isSpeaking}`}</p>
        <p>{JSON.stringify(transcript, null, 2)}</p>
      </div>
    </div>
  )
}