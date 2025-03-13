import clsx from "clsx";
import SirenIcon from "../../shared/ui/icons/siren-icon";
import { useConveyorState } from "./use-conveyor-state";

export default function State({ conveyor }: { conveyor: string }) {
  const { data, isPending, isSuccess } = useConveyorState(conveyor);
  if (isPending) {
    return (
      <div className="flex flex-col rounded-lg bg-gray-900  px-4 py-4 gap-2 justify-between">
        <div className="text-slate-300 text-2xl">Статус линии</div>
        <div className="flex text-slate-400">Загружаю...</div>
      </div>
    );
  }

  if (isSuccess && !data) {
    return (
      <div className="flex flex-col rounded-lg bg-gray-900  px-4 py-4 gap-2 justify-between">
        <div className="text-slate-300 text-2xl">Статус линии</div>
        <div className="flex text-slate-400">Не определен</div>
      </div>
    );
  }
  return (
    <div className="flex flex-col rounded-lg bg-gray-900  px-4 py-4 gap-2 justify-between">
      <div className="text-slate-300 text-2xl">Статус линии</div>
      <div className="flex flex-row items-center justify-between">
        <div
          className={clsx(
            data?.value === "preparing" && "text-yellow-500",
            data?.value === "in_progress" && "text-green-500",
            data?.value === "finished" && "text-fuchsia-500"
          )}
        >
          <SirenIcon size={30} />
        </div>
        <div
          className={clsx(
            "font-semibold",
            data?.value === "preparing" && "text-yellow-500",
            data?.value === "in_progress" && "text-green-500",
            data?.value === "finished" && "text-fuchsia-500"
          )}
        >
          {data?.description}
        </div>
      </div>
    </div>
  );
}
