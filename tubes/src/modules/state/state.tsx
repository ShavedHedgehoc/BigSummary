import SirenIcon from "../../shared/ui/icons/siren-icon";

export default function State({ conveyor }: { conveyor: string }) {
  return (
    <div className="flex flex-col rounded-lg bg-gray-900  px-4 py-4 gap-2 justify-between">
      <div className="text-slate-300 text-2xl">Статус линии</div>
      <div className="flex flex-row items-center justify-between">
        <div className="text-green-500">
          <SirenIcon size={30} />
        </div>
        <div className="text-slate-400">Работает</div>
      </div>
      {/* <div className="flex flex-row items-center justify-center py-2 px-4 rounded-lg bg-gray-600 text-slate-300 text-1xl font-semibold">
        Изменить
      </div> */}
    </div>
  );
}
