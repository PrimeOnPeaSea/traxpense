"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { deleteExpense } from "@/db/expense";

import { type Expense } from "@/lib/types";

const DeleteExpense = ({
  setExpense,
  id,
}: {
  setExpense: React.Dispatch<React.SetStateAction<Expense[]>>;
  id: string;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex items-center gap-2" asChild>
        <Button variant="outline">Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure?
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button
            onClick={() => {
              deleteExpense(id);
              setExpense((prev) => prev.filter((cat) => cat.id !== id));
              setOpen(false);
              toast.success("Expense deleted successfully");
            }}
          >
            Yes
          </Button>
          <Button onClick={() => setOpen(false)}>No</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteExpense;
