import { Button } from "@headlessui/react";
import clsx from "clsx";
import { useNavigate } from "react-router";
import { RouteNames } from "../shared/router/route-names";
import BarrelIcon from "../shared/components/icons/barrel-icon";
import DocumentIcon from "../shared/components/icons/document-icon";

export default function AppFooter({ plant, disabled }: { plant: string; disabled: number }) {
  const navigate = useNavigate();
  return (
    <div className="flex gap-1 justify-center items-center w-full ">
      <Button
        className={clsx(
          "py-2 px-4 w-48 h-full ",
          "flex flex-col  items-center justify-center",
          "text-2xl font-semibold",
          "data-[disabled]:text-slate-200 data-[disabled]:bg-gray-900 ",
          "data-[active]:text-slate-200 data-[active]:bg-gray-800",
          "text-slate-200 bg-gray-900"
        )}
        disabled={disabled == 1}
        onClick={() => navigate(`${RouteNames.CANS}?plant=${plant}`)}
      >
        <BarrelIcon size={8} />
        <div className="flex flex-col gap-1">
          <div>Емкости</div>
          <div className={clsx("h-2 w-24", disabled !== 1 && "bg-slate-200", "bg-amber-600 rounded-md")} />
        </div>
      </Button>

      <Button
        className={clsx(
          "py-2 px-4 w-48 h-full ",
          "flex flex-col  items-center justify-center",
          "text-2xl font-semibold",
          "data-[disabled]:text-slate-200 data-[disabled]:bg-gray-900 ",
          "data-[active]:text-slate-200 data-[active]:bg-gray-800",
          "text-slate-200 bg-gray-900"
        )}
        disabled={disabled == 2}
        onClick={() => navigate(`${RouteNames.APP_SUMMARY}?plant=${plant}`)}
      >
        <DocumentIcon size={8} />
        <div className="flex flex-col gap-1">
          <div>Сводки</div>
          <div className={clsx("h-2 w-24", disabled !== 2 && "bg-slate-200", "bg-amber-600 rounded-md")} />
        </div>
      </Button>

      <Button
        className={clsx(
          "py-2 px-4 w-48 h-full ",
          "flex flex-col  items-center justify-center",
          "text-2xl font-semibold",
          "data-[disabled]:text-slate-200 data-[disabled]:bg-gray-900 ",
          "data-[active]:text-slate-200 data-[active]:bg-gray-800",
          "text-slate-200 bg-gray-900"
        )}
        disabled={disabled == 3}
        onClick={() => navigate(`${RouteNames.BOILS}?plant=${plant}`)}
      >
        <DocumentIcon size={8} />
        <div className="flex flex-col gap-1">
          <div>Основы</div>
          <div className={clsx("h-2 w-24", disabled !== 3 && "bg-slate-200", "bg-amber-600 rounded-md")} />
        </div>
      </Button>
    </div>
  );
}
