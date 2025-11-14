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

export const ConnectDialog = ({
  service,
  open,
  onOpenChange,
}: ConnectProps) => {
  const formSchima = z.object({
    publicApiKey: z.string().min(1, "Public API key is required"),
    privateApiKey: z.string().min(1, "Private API key is required"),
  });

  const [isCreating, setIsCreating] = useState(false);

  const upsertSecret = useMutation(api.private.secrets.upsert);
  const form = useForm<z.infer<typeof formSchima>>({
    resolver: zodResolver(formSchima),
    defaultValues: {
      publicApiKey: "",
      privateApiKey: "",
    },
  });

  const handleCancel = () => {
    onOpenChange(false);
    form.reset();
  };

  const handleConnect = async () => {
    setIsCreating(true);
    try {
      await upsertSecret({
        service: "vapi",
        value: {
          publicApiKey: form.getValues().publicApiKey,
          privateApiKey: form.getValues().privateApiKey,
        },
      });
      toast.success("Vapi connected!");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      onOpenChange(false);
      setIsCreating(false);
      form.reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Enable Vapi</DialogTitle>
          <DialogDescription>
            Your API keys are safely encrypted and stored using AWS Secrets
            Manager.
          </DialogDescription>
          <Form {...form}>
            <form
              className="flex flex-col gap-y-4"
              onSubmit={form.handleSubmit(handleConnect)}
            >
              <FormField
                control={form.control}
                name="publicApiKey"
                render={({ field }) => (
                  <FormItem>
                    <Label>Public API key</Label>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Your public API key"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="privateApiKey"
                render={({ field }) => (
                  <FormItem>
                    <Label>Private API key</Label>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Your private API key"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={isCreating}
            onClick={handleCancel}
            variant="outline"
          >
            Cancel
          </Button>
          
          {isCreating ? (
            <Button
              disabled={!form.formState.isValid || isCreating}
              variant="outline"
            >
              <Spinner />
              <Shimmer>
                Connecting...
              </Shimmer>
            </Button>
          ) : (
            <Button
              disabled={!form.formState.isValid || isCreating}
              onClick={handleConnect}
              variant="outline"
              type="submit"
            >
              Connect
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
