'use client';

import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import {useMutation, useQuery} from "convex/react";
import {api} from "@workspace/backend/_generated/api";
import {Button} from "@workspace/ui/components/button";

export default function Page() {
  const users = useQuery(api.users.getMany);
  const addUser = useMutation(api.users.add)
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-svh">
        <OrganizationSwitcher 
        hidePersonal
        />
        <UserButton />        
          <div className="gap-4 max-w-sm w-full mx-auto">
              <Button onClick={() => addUser()}>
                Add User
              </Button>
          </div>
          <div className="max-w-sm w-full mx-auto">
            {JSON.stringify(users, null, 2)}
          </div>
        <p>apps/web</p>
      </div>
    </>
  )
}
