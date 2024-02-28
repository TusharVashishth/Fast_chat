"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useUser } from "@clerk/nextjs";
import axios, { AxiosError } from "axios";
import { groupUrl } from "@/lib/api";
import { toast } from "react-toastify";
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";

export default function AddGroup() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<GroupErrorType>();
  const { user } = useUser();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post(groupUrl, {
        name: payload.name,
        description: payload.description,
        user_id: user?.id,
      })
      .then((res) => {
        setLoading(false);
        toast.success("Group added successfully!", { theme: "colored" });
        setPayload({ name: "", description: "" });
        router.refresh();
        setOpen(false);
      })
      .catch((err: AxiosError) => {
        setLoading(false);
        if (err?.response?.status == 403) {
          setErrors(err.response?.data as GroupErrorType);
        } else if (err?.response?.status == 500) {
          toast.error("Something went wrong", { theme: "colored" });
        }
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Create group</Button>
      </DialogTrigger>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Create Group</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <Label htmlFor="name"></Label>
            <Input
              id="name"
              placeholder="Enter group name"
              value={payload.name}
              onChange={(e) => setPayload({ ...payload, name: e.target.value })}
            />
            <span className="text-red-400">{errors?.errors?.name}</span>
          </div>
          <div className="mb-3">
            <Label htmlFor="description"></Label>
            <Textarea
              id="description"
              placeholder="Enter group description"
              value={payload.description}
              onChange={(e) =>
                setPayload({ ...payload, description: e.target.value })
              }
            />
            <span className="text-red-400">{errors?.errors?.description}</span>
          </div>

          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? "Processing.." : "Submit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
