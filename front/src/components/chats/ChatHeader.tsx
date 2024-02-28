import React from "react";

export default function ChatHeader({ group }: { group: GroupType }) {
  return (
    <nav className="w-full  px-2">
      <div>
        <p className="font-bold">{group.name}</p>
        <p className="text-sm">{group.description}</p>
      </div>
    </nav>
  );
}
