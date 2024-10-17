"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddExpense from "./addExpense";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import EditExpense from "./editExpense";
import DeleteExpense from "./deleteExpense";
import type { Category, Expense } from "@/lib/types";

const ExpenseCard = ({
  expenses,
  categories,
  mail,
}: {
  expenses: Expense[];
  categories: Category[];
  mail: string;
}) => {
  const [expense, setExpense] = useState<Expense[]>(expenses);
  const [category, setCategory] = useState<Category[]>(categories);
  console.log(expense);
  return (
    <Card className="w-full mt-5 h-[calc(100vh-210px)] overflow-y-auto">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-2xl font-bold">Expenses</CardTitle>
        <AddExpense setExpense={setExpense} category={category} mail={mail} />
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead className="text-center">Amount</TableHead>
                <TableHead className="text-right">Without Tax</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expense.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{expense.name}</TableCell>
                  <TableCell>
                    {new Date(expense.date).toLocaleDateString("en-US")}
                  </TableCell>
                  <TableCell>{expense.category.name}</TableCell>
                  <TableCell>{expense.notes}</TableCell>
                  <TableCell className="text-center">
                    ₹{expense.amount}
                  </TableCell>
                  <TableCell className="text-right">
                    ₹{expense.amount - (expense.amount * expense.tax) / 100}
                  </TableCell>
                  <TableCell className="flex gap-2 items-center justify-end">
                    <EditExpense
                      category={category}
                      expense={[expense]}
                      setExpense={setExpense}
                      id={expense.id}
                    />
                    <DeleteExpense setExpense={setExpense} id={expense.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseCard;
