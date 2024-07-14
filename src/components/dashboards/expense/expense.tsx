import { auth } from "@/auth";
import { redirect } from "next/navigation";

import ExpenseCard from "./expenseCard";

import { getCategories } from "@/db/category";
import { getExpenses } from "@/db/expense";

import { type Category, type Expense } from "@/lib/types";

const Expense = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect(`/`);
  }
  const userEmail = session.user.email || "";
  const categories = (await getCategories(userEmail)) as Category[];
  const expenses = (await getExpenses(userEmail)) as Expense[];

  return (
    <ExpenseCard categories={categories} expenses={expenses} mail={userEmail} />
  );
};

export default Expense;
