import { Button } from "@headlessui/react";
import clsx from "clsx";
import { useAppSummaryStore } from "./store/use-app-summary-store";
import { useShallow } from "zustand/react/shallow";

export default function AppSummaryTopMenu() {
  const current = useAppSummaryStore(useShallow((state) => state.current));
  const setCurrent = useAppSummaryStore(useShallow((state) => state.setCurrent));
  return (
    <div className="flex flex-row gap-2 h-full py-4 items-center justify-center">
      <Button
        className={clsx(
          "rounded-md  py-2 px-4 w-32 h-full",
          "flex flex-col gap-1 items-center justify-between",
          "text-lg font-semibold",
          "data-[active]:text-slate-900 data-[active]:bg-slate-400",
          "text-slate-200 bg-slate-700"
        )}
        disabled={current}
        onClick={() => setCurrent(true)}
      >
        <div className="flex flex-grow justify-center items-center ">Сегодня</div>
        <div className={clsx("h-2 w-24", !current && "bg-slate-700", "bg-amber-600 rounded-md")} />
      </Button>

      <Button
        className={clsx(
          "rounded-md  py-2 px-4 w-32 h-full",
          "flex flex-col gap-1 items-center justify-between",
          "text-lg font-semibold",
          "data-[active]:text-slate-900 data-[active]:bg-slate-400",
          "text-slate-200 bg-slate-700"
        )}
        disabled={!current}
        onClick={() => setCurrent(false)}
      >
        <div className="flex flex-grow justify-center items-center ">Завтра</div>
        <div className={clsx("h-2 w-24", current && "bg-slate-700", "bg-amber-600 rounded-md")} />
      </Button>
    </div>
  );
}
