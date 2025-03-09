import ConveyorIcon from "../../shared/ui/icons/conveyor-icon";

export default function Header({ conveyor, post }: { conveyor: string; post: string }) {
  return (
    <div className="flex flex-row flex-grow items-center rounded-lg bg-gray-900 px-4 py-2 gap-4">
      <div className="text-slate-300">
        <ConveyorIcon size={36} />
      </div>

      <div className="flex flex-col gap-2 items-start ">
        <div className="text-2xl font-semibold text-slate-300">Конвейер {conveyor}</div>
        <div className="text-xl font-semibold text-slate-400">Пост {post}</div>
      </div>
    </div>
  );
}
