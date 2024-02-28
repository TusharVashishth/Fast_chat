import Image from "next/image";
import React from "react";
import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-1">
      <div className="flex items-center space-x-2">
        <Image
          src="/images/logo_192.png"
          width={40}
          height={40}
          alt="logo"
          className="object-contain"
        />
        <h1 className="text-xl font-bold">FastChat</h1>
      </div>

      <UserButton />
    </nav>
  );
}
