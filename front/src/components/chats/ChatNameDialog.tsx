"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter, usePathname } from "next/navigation";

export default function ChatNameDialog({
  open,
  callback,
}: {
  open: boolean;
  callback: () => void;
}) {
  const router = useRouter();
  const pathName = usePathname();
  const [name, setName] = useState("");
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    router.replace(`${pathName}?name=${name}`);
    callback();
  };
  return (
    <Dialog open={open} onOpenChange={callback}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Enter your Name</DialogTitle>
          <DialogDescription>
            Name is required to join the group and please make sure name is
            correct for good conversation.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <Label htmlFor="name"></Label>
            <Input
              id="name"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <Button className="w-full" disabled={name.length <= 2}>
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
