"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import AddBudget from "./addBudget";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
// import EditBudget from "./editBudget";
// import DeleteBudget from "./deleteBudget";
import { type Budget } from "@/lib/types";

const BudgetCard = ({ budget, mail }: { budget: Budget[]; mail: string }) => {
  const [Budget, setBudget] = useState<Budget[]>(budget);

  return (
    <Card className="w-full mt-5 h-[calc(100vh-210px)] overflow-y-auto">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-2xl font-bold">
          Budget
          <Badge className="ml-2">Beta</Badge>
        </CardTitle>
        {/* <AddBudget setBudget={setBudget} mail={mail} /> */}
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead className="text-center">End Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Budget.map((Budget) => (
                <TableRow key={Budget.id}>
                  <TableCell>{Budget.name}</TableCell>
                  <TableCell>₹{Budget.amount}</TableCell>
                  <TableCell>
                    {new Date(Budget.startDate).toLocaleDateString("en-US")}
                  </TableCell>
                  <TableCell>
                    {new Date(Budget.endDate).toLocaleDateString("en-US")}
                  </TableCell>
                  <TableCell className="flex gap-2 items-center justify-end">
                    {/* <EditBudget
                      Budget={[Budget]}
                      setBudget={setBudget}
                      id={Budget.id}
                    /> */}
                    {/* <DeleteBudget
                      Budget={Budget}
                      setBudget={setBudget}
                      id={Budget.id}
                    /> */}
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

export default BudgetCard;
