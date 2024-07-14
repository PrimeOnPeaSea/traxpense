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
import { FaTrash } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { deleteUser } from "@/db/account";

const DeleteAccount = ({ userEmail }: { userEmail: string }) => {
  const [deleteEmail, setDeleteEmail] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm" className="justify-self-start">
          Delete Account
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure?
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          <Label htmlFor="delete-email">Type your email to confirm</Label>
          <Input
            id="delete-email"
            type="email"
            placeholder={userEmail}
            value={deleteEmail}
            onChange={(e) => setDeleteEmail(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button
            disabled={deleteEmail !== userEmail}
            variant="destructive"
            className="flex gap-2 items-center justify-center"
            onClick={() => {
              deleteUser(userEmail);
              setOpen(false);
              toast.success("Account deleted successfully");
            }}
          >
            <FaTrash />
            <hr className="h-6 border-r border-gray-300" />
            Yes Delete My Account
          </Button>
          <Button onClick={() => setOpen(false)}>No</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccount;
