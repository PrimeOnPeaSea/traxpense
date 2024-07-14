"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { signOut } from "next-auth/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "@/lib/types";
import DeleteAccount from "./deleteAccount";

const AccountCard = ({ user }: { user: User }) => {
  return (
    <div className="flex flex-col gap-8 p-6 md:p-8 lg:p-10">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 md:col-span-2 lg:col-span-1">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user.image} />
                <AvatarFallback>
                  {user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="text-lg font-semibold">{user.name}</div>
                <div className="text-sm text-muted-foreground">
                  {user.email}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Total Expenses:</h3>
                <p className="text-sm text-muted-foreground">
                  ₹
                  {user.expenses
                    .map((expense) => expense.amount)
                    .reduce((a, b) => a + b, 0)
                    .toFixed(2)}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">User&apos;s Budget:</h3>
                <p className="text-sm text-muted-foreground">
                  ₹
                  {user.budgets
                    .map((budget) => budget.amount)
                    .reduce((a, b) => a + b, 0)
                    .toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input disabled id="name" defaultValue={user.name} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                disabled
                id="email"
                type="email"
                defaultValue={user.email}
              />
            </div>
            <div className="w-full flex gap-2">
              Account Verified by{" "}
              <Badge className="bg-green-500 text-white">Google</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="logout">Logout Sessions</Label>
              <Button
                variant="outline"
                size="sm"
                className="justify-self-start"
                onClick={() => signOut()}
              >
                Logout All Sessions
              </Button>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="delete">Delete Account</Label>
              <DeleteAccount userEmail={user.email} />
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Expense Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-y-scroll max-h-[300px]">
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
                {user.expenses.map((expense) => (
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
    </div>
  );
};

export default AccountCard;
