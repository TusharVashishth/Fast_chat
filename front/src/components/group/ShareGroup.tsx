"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Copy } from "lucide-react";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappIcon,
  WhatsappShareButton,
  LineShareButton,
  LinkedinIcon,
  EmailShareButton,
  EmailIcon,
  TwitterIcon,
  TwitterShareButton,
} from "next-share";
import { toast } from "react-toastify";
import { Button } from "../ui/button";

export default function ShareGroup({ url }: { url: string }) {
  const copyUrl = async () => {
    navigator.clipboard.writeText(url);
    toast.success("Group URL copied successfully!", { theme: "colored" });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">Share</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Group</DialogTitle>
        </DialogHeader>
        <div className="flex rounded-md border justify-between p-2 mt-2">
          <strong className="text-gray-500"> {url}</strong>
          <Copy onClick={copyUrl} className="cursor-pointer" />
        </div>
        <div className="flex items-center space-x-5 mt-5">
          <TwitterShareButton
            url={url}
            hashtags={["#fastchat ,#quickchat ,#chatsmad easy"]}
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <FacebookShareButton
            url={url}
            quote={"Fast chats."}
            hashtag={"#fastchats"}
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <WhatsappShareButton url={url}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <LineShareButton url={url}>
            <LinkedinIcon size={32} round />
          </LineShareButton>
          <EmailShareButton url={url}>
            <EmailIcon size={32} round />
          </EmailShareButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
