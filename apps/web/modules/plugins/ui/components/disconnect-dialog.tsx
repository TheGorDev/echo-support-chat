"use client";
import React from "react";
import { useMutation } from "convex/react";
import { useState } from "react";
import { api } from "@workspace/backend/_generated/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { Label } from "@workspace/ui/components/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@workspace/ui/components/form";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Spinner } from "@workspace/ui/components/spinner";
import { Shimmer } from "@workspace/ui/components/ai/shimmer";

interface ConnectProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: string;
}

export const DisconnectDialog = ({
  service,
  open,
  onOpenChange,
}: ConnectProps) => {
  const formSchima = z.object({
    publicApiKey: z.string().min(1, "Public API key is required"),
    privateApiKey: z.string().min(1, "Private API key is required"),
  });

  const [isRemoving, setIsRemoving] = useState(false);

  const upsertSecret = useMutation(api.private.secrets.upsert);
  const removePlugin = useMutation(api.private.plugins.remove);

  const handleCancel = () => {
    onOpenChange(false);
  };

  const handleRemove = async () => {
    setIsRemoving(true);
    try {
      await removePlugin({
        service: "vapi"
      })
      toast.success("Vapi disconnected!");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      onOpenChange(false);
      setIsRemoving(false);
    }
  };



  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Disable Vapi</DialogTitle>
          <DialogDescription>
            Disable your VAPI integration
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={isRemoving}
            onClick={handleCancel}
            variant="outline"
          >
            Cancel
          </Button>
          
          {isRemoving ? (
            <Button
              disabled={isRemoving}
              variant="outline"
            >
              <Spinner />
              <Shimmer>
                Disconnecting...
              </Shimmer>
            </Button>
          ) : (
            <Button
              disabled={isRemoving}
              onClick={handleRemove}
              variant="outline"
              type="submit"
            >
              Disconnect
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
