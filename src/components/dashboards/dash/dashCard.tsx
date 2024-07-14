import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { User } from "@/lib/types";
import PieChartCard, { type DataItem } from "./pieChartCard";
import StackedAreaChartCard, { type ExpenseItem } from "./stackedAreaCard";

const DashCard = ({ userData }: { userData: User }) => {
  const { expenses } = userData;
  const totalExpenses = expenses
    .map((expense) => expense.amount)
    .reduce((a, b) => a + b, 0);
  const totalCategories = userData.categories.length;
  const totalBudgets = userData.budgets.length;
  const totalTransactions = expenses.length;

  const data01: DataItem[] = userData.categories.map((category) => ({
    name: category.name,
    value: expenses
      .filter((expense) => expense.category.id === category.id)
      .reduce((a, b) => a + b.amount, 0),
  }));

  const data02: DataItem[] = expenses.map((expense) => ({
    name: expense.name,
    value: expense.amount,
  }));

  const transformedData: ExpenseItem[] = expenses.map((expense) => ({
    name: expense.name,
    amount: expense.amount,
    category: expense.category.name,
    categoryExpenseAmount: expenses
      .filter((exp) => exp.category.id === expense.category.id)
      .reduce((a, b) => a + b.amount, 0),
    date: new Date(expense.date).toLocaleDateString("en-US"),
  }));

  return (
    <Card className="w-full mt-5 min-h-[calc(100vh-210px)]">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-2xl font-bold">User Dashboard</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col p-4 bg-primary-foreground rounded-lg border">
            <h3 className="text-lg font-bold">Total Expenses</h3>
            <p className="text-2xl font-bold">₹{totalExpenses}</p>
          </div>
          <div className="flex flex-col p-4 bg-primary-foreground rounded-lg border">
            <h3 className="text-lg font-bold">Total Categories</h3>
            <p className="text-2xl font-bold">{totalCategories}</p>
          </div>
          <div className="flex flex-col p-4 bg-primary-foreground rounded-lg border">
            <h3 className="text-lg font-bold">Total Budgets</h3>
            <p className="text-2xl font-bold">{totalBudgets}</p>
          </div>
          <div className="flex flex-col p-4 bg-primary-foreground rounded-lg border">
            <h3 className="text-lg font-bold">Total Transactions</h3>
            <p className="text-2xl font-bold">{totalTransactions}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="flex flex-row justify-between items-end">
              <CardTitle>Expenses by Category</CardTitle>
              <CardDescription className="text-xs">
                Outer Circle: <span className="font-bold">Expenses</span>
                <br />
                Inner Circle: <span className="font-bold">Categories</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 overflow-visible">
              <PieChartCard data01={data01} data02={data02} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row justify-between items-end">
              <CardTitle>Expenses Over-Time</CardTitle>
              <CardDescription className="text-xs">
                Expense: Name, Category, Amount and Date
              </CardDescription>
            </CardHeader>
            <CardContent className="overflow-visible">
              <StackedAreaChartCard data={transformedData} />
            </CardContent>
          </Card>
        </div>
        <div className="border rounded-lg overflow-y-scroll max-h-[300px]">
          <div className="flex justify-between items-center border-b">
            <h3 className="text-lg font-bold p-4">Recent Expenses</h3>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Expense Name</TableHead>
                <TableHead>Expense Category</TableHead>
                <TableHead>Expense Amount</TableHead>
                <TableHead>Expense Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{expense.name}</TableCell>
                  <TableCell>{expense.category.name}</TableCell>
                  <TableCell>₹{expense.amount}</TableCell>
                  <TableCell>
                    {new Date(expense.date).toLocaleDateString("en-US")}
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

export default DashCard;
