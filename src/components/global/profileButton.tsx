import React from "react";
import { SignIn } from "@/components/auth/sign-in";
import { auth } from "@/auth";
import { UserNav } from "@/components/admin-panel/user-nav";

export default async function ProfileButton() {
  const session = await auth();

  if (!session?.user) return <SignIn />;

  return <UserNav session={session} />;
}
