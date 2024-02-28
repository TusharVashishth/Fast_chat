import AddGroup from "@/components/group/AddGroup";
import React, { Suspense } from "react";
import Loading from "./loading";
import FetchGroups from "@/components/group/FetchGroups";
import Navbar from "@/components/base/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />

      <div className="container">
        <div className="flex justify-end items-end">
          <AddGroup />
        </div>
        <Suspense fallback={<Loading />}>
          <FetchGroups />
        </Suspense>
      </div>
    </div>
  );
}
