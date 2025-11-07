"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { CircleDashedIcon } from "lucide-react";
import { contactSessionIdAtomFamily, errorMessageAtom, loadingMessageAtom, organizationIdAtom, screenAtom } from "@/modules/widget/atoms/widget-atoms";
import WidgetHeader from "@/modules/widget/ui/components/widget-header";
import { useEffect, useState } from "react";
import { api } from "@workspace/backend/_generated/api";
import { useAction, useMutation } from "convex/react";

type InitStep =  "org" | "session" | "settings" | "vapi" | "done"

export const WidgetLoadingScreen = ({organizationId}: {organizationId: string | null}) => {
  const [step, setStep] = useState<InitStep>("org")
  const [sessionValid, setSessionValid] = useState(false)

  const loadingMessage = useAtomValue(loadingMessageAtom)
  const setOrganizationId = useSetAtom(organizationIdAtom)
  const setLoadingMessage = useSetAtom(loadingMessageAtom)
  const setErrorMessage = useSetAtom(errorMessageAtom)
  const setScreen = useSetAtom(screenAtom)

  const contactSessionId = useAtomValue(contactSessionIdAtomFamily(organizationId || ""))

  const validateOrganization = useAction(api.public.organizations.validate)

  useEffect(()=>{
    if(step !== "org") return
    setLoadingMessage("Finding organization ID...")
    if(!organizationId) {
      setErrorMessage("Organization ID is required")
      setScreen("error")
      return
    }
    setLoadingMessage("Varifying organization...")
    validateOrganization({organizationId: organizationId || "" })
      .then((result) => {
        if(result.valid) {
          setOrganizationId(organizationId)
          setStep("session")
        } else {
          setErrorMessage(result.reason || "Invalid configuration")
          setScreen("error")
        }
      })
      .catch((error) => {
        console.log(error)
        setErrorMessage("Unable to verify organization")
        setScreen("error")
      })
  }, [step, organizationId, setErrorMessage, setScreen, setOrganizationId, setStep, validateOrganization, setLoadingMessage])

  const validateContactSession = useMutation(api.public.contactSessions.validate)
  useEffect(()=>{
    if(step !== "session") return

    setLoadingMessage("Finding session ID...")

    if(!contactSessionId) {
      setSessionValid(false);
      setStep("done")
      return
    }

    setLoadingMessage("Validating session...")

     validateContactSession({contactSessionId})
     .then((result) => {
      setSessionValid(result.valid)
      setStep("done")
     })
     .catch((error) => {
      console.log(error)
        console.log(error)
        setErrorMessage("Unable to verify contact session")
        setStep("done")
     })

  },[step, contactSessionId, validateContactSession, setLoadingMessage])

  useEffect(()=>{
    if(step !== "done") return

    const hasValidSession = contactSessionId && sessionValid
    setScreen(hasValidSession ? "selection" : "auth")
  },[step, contactSessionId, sessionValid, setScreen])


  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6 font-semibold">
          <p className="text-3xl">Hi there! 👋</p>
          <p className="text-lg">Let's get you started</p>
        </div>
      </WidgetHeader>

      <div className="flex flex-1 flex-col items-center justify-center gap-y-4 p-4 text-muted-foreground">
        <CircleDashedIcon className="animate-spin"/>
          {loadingMessage}
      </div>
    </>
  );
};
