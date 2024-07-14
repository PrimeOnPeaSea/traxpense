import { auth } from "@/auth";
import { redirect } from "next/navigation";

import DashCard from "./dashCard";

import { getUser } from "@/db/account";

import type { User } from "@/lib/types";

const Dash = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect(`/`);
  }
  const userEmail = session.user.email || "";
  const userData = (await getUser(userEmail)) as User;

  return <DashCard userData={userData} />;
};

export default Dash;
