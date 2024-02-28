import React from "react";
import { currentUser } from "@clerk/nextjs";
import { fetchGroups } from "@/lib/fetch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dateFormat } from "@/lib/utils";
import ShareGroup from "./ShareGroup";
import Link from "next/link";

export default async function FetchGroups() {
  const user = await currentUser();
  const groups: Array<GroupType> | [] = await fetchGroups(user?.id!);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {groups &&
        groups.length > 0 &&
        groups.map((item, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Link href={`/chats/${item.id}?name=${user?.firstName}`}>
                <p>{item.description}</p>
                <p className="font-bold">{dateFormat(item.created_at)}</p>
              </Link>
              <div className="text-right">
                <ShareGroup
                  url={`${process.env.NEXT_PUBLIC_APP_URL}/chats/${item.id}`}
                />
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}
