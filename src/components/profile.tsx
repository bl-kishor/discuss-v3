"use client";
import { useSession } from "next-auth/react";

export default function Profile() {
  const session = useSession();

  return (
    <div>
      <div>From Client:</div>
      <div>
        {session.data?.user
          ? JSON.stringify(session.data.user)
          : "User is not signed in"}
      </div>
    </div>
  );
}
