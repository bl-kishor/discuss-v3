"use client";

import {
  Avatar,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@heroui/react";
import * as actions from "@/actions";
import { useSession } from "next-auth/react";

export default function HeaderAuth() {
  const session = useSession();

  let authContent: React.ReactNode;
  if (session.status === "loading") {
    //authContent = null;
  } else if (session.data?.user) {
    authContent = (
      <Popover>
        <PopoverTrigger>
          <Avatar>
            <Avatar.Image src={session.data.user.image || ""} />
          </Avatar>
        </PopoverTrigger>
        <PopoverContent>
          <div className="p-4">
            <form action={actions.signOut}>
              <Button type="submit">Sign Out</Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    );
  } else {
    authContent = (
      <ul className="flex items-center gap-4">
        <li>
          <form action={actions.signIn}>
            <Button type="submit" variant="outline">
              Sign In
            </Button>
          </form>
        </li>
        <li>
          <form action={actions.signIn}>
            <Button type="submit">Sign Up</Button>
          </form>
        </li>
      </ul>
    );
  }

  return authContent;
}
