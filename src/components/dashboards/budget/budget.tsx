import { auth } from "@/auth";
import { redirect } from "next/navigation";

import BudgetCard from "./budgetCard";

import { getBudget } from "@/db/budget";

import type { Budget } from "@/lib/types";

const Budget = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect(`/`);
  }
  const userEmail = session.user.email || "";
  const budget = (await getBudget(userEmail)) as Budget[];

  return <BudgetCard budget={budget} mail={userEmail} />;
};

export default Budget;
