import React from "react";
import { useSearchParams } from "react-router";

export default function Report() {
  let [searchParams] = useSearchParams();
  const conveyor = searchParams.get("conveyor");
  const post = searchParams.get("post");
  return (
    <React.Fragment>
      <div className="flex flex-col flex-grow  w-1/3 h-full items-center justify-start rounded-lg bg-gray-900 1border border-stone-600 px-4  gap-2 py-4">
        Report
      </div>
    </React.Fragment>
  );
}
