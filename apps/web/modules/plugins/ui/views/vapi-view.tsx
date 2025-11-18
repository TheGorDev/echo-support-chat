"use client";

import React, { useState } from "react";
import {
  type Feature,
  PluginCard,
} from "@/modules/plugins/ui/components/plugin-card";
import {
  GlobeIcon,
  PhoneCallIcon,
  PhoneIcon,
  WorkflowIcon,
} from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { ConnectDialog } from "@/modules/plugins/ui/components/connect-dialog";
import VapiConnectedView from "../components/vapi-connected-view";
import { DisconnectDialog } from "../components/disconnect-dialog";

const VapiFeatures: Feature[] = [
  {
    icon: GlobeIcon,
    label: "Web voice calls",
    description: "Voice chat directly in your app",
  },
  {
    icon: PhoneIcon,
    label: "Phone numbers",
    description: "Get dedicated business lines",
  },
  {
    icon: PhoneCallIcon,
    label: "Outbound calls",
    description: "Automated customer outreach",
  },
  {
    icon: WorkflowIcon,
    label: "Workflows",
    description: "Custom conversation flows",
  },
];

export const VapiView = () => {
  const vapiPlugin = useQuery(api.private.plugins.getOne, { service: "vapi" });

  const [connectOpen, setConnectOpen] = useState(false);
  const [removeOpen, setRemoveOpen] = useState(false)

  return (
    <>
      <ConnectDialog
        open={connectOpen}
        onOpenChange={setConnectOpen}
        service="vapi"
      />
      <DisconnectDialog
        open={removeOpen}
        onOpenChange={setRemoveOpen}
        service="vapi"
      />
      <div className="flex min-h-screen flex-col bg-muted p-8">
        <div className="mx-auto w-full max-w-screen-md">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-4xl">Vapi Plugin</h1>
            <p className="text-muted-foreground">
              Connect Vapi to enable AI voice calls and phone support
            </p>
          </div>

          {vapiPlugin ? (
            <VapiConnectedView onDisconnect={()=>setRemoveOpen(true)}/>
          ) : (
            <div className="mt-8">
              <PluginCard
                serviceImage="/logo.svg"
                serviceName="VAPI"
                features={VapiFeatures}
                onSubmit={()=>setConnectOpen(true)}
                isDisabled={vapiPlugin === undefined}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
