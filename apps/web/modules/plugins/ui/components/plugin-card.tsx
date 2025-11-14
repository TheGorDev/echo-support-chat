import React from "react";
import { ArrowLeftRightIcon, type LucideIcon, PlugIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@workspace/ui/components/button";
import { string } from "zod/v4";

export interface Feature {
  icon: LucideIcon;
  label: string;
  description: string;
}

interface PluginCardProps {
  isDisabled?: boolean;
  serviceName: string;
  serviceImage: string;
  features: Feature[];
  onSubmit: () => void;
}

export const PluginCard = ({
  isDisabled,
  serviceName,
  serviceImage,
  features,
  onSubmit,
}: PluginCardProps) => {
  return (
    <div className="h-fir w-full rounded-lg border bg-background p-8">
      <div className="mb-6 flex items-center justify-center gap-6">
        <div className="flex flex-col items-center">
          <Image
            alt="Platform"
            className="rounded object-contain"
            height={40}
            width={40}
            src="/vapi.jpg"
          />
        </div>
        <div className="flex flex-col items-center gap-1">
          <ArrowLeftRightIcon />
        </div>
        <div className="flex flex-col items-center">
          <Image
            alt={serviceName}
            className="rounded object-contain"
            height={40}
            width={40}
            src={serviceImage}
          />
        </div>
      </div>
      <div className="mb-6 text-center">
        <p className="text-lg">Connect your {serviceName} account</p>
      </div>

      <div className="mb-6">
        <div className="space-y-4">
          {features.map((feature) => (
            <div className="flex items-center gap-3" key={feature.label}>
              <div className="flex size-10 items-center justify-center rounded-lg border bg-muted">
                <feature.icon className="size-6 text-muted-foreground" />
              </div>
              <div>
                <div className="font-medium text-sm">{feature.label}</div>
                <div className="text-muted-foreground text-xs">
                  {feature.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-6 items-center">
        <Button className="w-full" onClick={()=>onSubmit?.()} disabled={isDisabled}>Connect <PlugIcon /></Button>
      </div>
    </div>
  );
};
