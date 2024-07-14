import { auth } from "@/auth";
import { redirect } from "next/navigation";

import AccountCard from "./accountCard";

import { getUser } from "@/db/account";

import type { User } from "@/lib/types";

const Account = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect(`/`);
  }
  const userEmail = session.user.email || "";
  const user = (await getUser(userEmail)) as User;

  return <AccountCard user={user} />;
};

export default Account;
