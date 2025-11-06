'use client';

import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import {useMutation, useQuery} from "convex/react";
import {api} from "@workspace/backend/_generated/api";
import {Button} from "@workspace/ui/components/button";

/**
 * Renders a centered page showing "web" and prepares user query and add mutation.
 *
 * Initializes a subscription to fetch multiple users and a mutation function to add users,
 * though neither is invoked by this component's UI.
 *
 * @returns The page's React element rendering a centered "web" label.
 */
export default function Page() {
  const users = useQuery(api.users.getMany);
  const addUser = useMutation(api.users.add)
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-svh">
        web
      </div>
    </>
  )
}