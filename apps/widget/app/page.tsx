'use client';

import { useVapi } from '@/modules/widget/hooks/use-vapi';
import { Button } from '@workspace/ui/components/button';

/**
 * Renders a page with controls to start and end a call and a panel displaying connection state and transcript.
 *
 * The UI includes "Start Call" and "End Call" buttons and a content area showing `isConnected`, `isConnecting`,
 * `isSpeaking`, and the `transcript` as formatted JSON.
 *
 * @returns The component's JSX element that renders call controls and the connection/transcript panel.
 */
export default function Page() {

  const {isSpeaking, isConnected, isConnecting, transcript, startCall, endCall} = useVapi();

  return (
    <div className="flex flex-col items-center justify-center min-h-svh max-w-md mx-auto w-full">
      <Button onClick={startCall} variant="success" className="mb-4">
        Start Call
      </Button>
      <Button onClick={endCall} variant="destructive" className="mt-4">
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