"use client";
import { useUser } from "@clerk/clerk-react";
export default function UserData() {
  const { isSignedIn, user, isLoaded } = useUser();
  return (
    <div>
      {isSignedIn}
      {isLoaded}
    </div>
  );
}
