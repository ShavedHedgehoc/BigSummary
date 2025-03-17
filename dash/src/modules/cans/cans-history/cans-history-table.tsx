import { useShallow } from "zustand/react/shallow";
import { useCanRecords } from "../../../shared/api/use-can-records";
import { useCansHistoryModalStore } from "../store/use-cans-history-modal-store";
import { formatDateToString, formatTimeToString } from "../../../shared/helpers/date-time-formatters";

export default function CansHistoryTable() {
  const canId = useCansHistoryModalStore(useShallow((state) => state.canId));
  const { data, isSuccess, isPending } = useCanRecords(canId);

  if (isPending) {
    return (
      <div className="h-0 min-h-full overflow-y-auto  w-full  rounded-xl  scrollbar-none">
        <div className="h-full min-h-0 text-slate-200 font-semibold flex items-center justify-center">Загружаю...</div>
      </div>
    );
  }

  if (isSuccess && data.length === 0) {
    return (
      <div className="h-0 min-h-full overflow-y-auto  w-full  rounded-xl  scrollbar-none">
        <div className="h-full min-h-0 text-slate-200 font-semibold flex items-center justify-center">
          Записей не найдено...
        </div>
      </div>
    );
  }

  return (
    <div className="h-0 min-h-full overflow-y-auto  w-full  rounded-xl  scrollbar-none">
      <div className="h-full min-h-0 ">
        {isSuccess && data && (
          <table className="table-auto text-slate-300 w-full">
            <thead className="text-xs sticky top-0 border-b border--600  bg-gray-900">
              <tr>
                <th className="border-b border-gray-800 px-4 py-4">Дата</th>
                <th className="border-b border-l border-gray-800 px-4 py-4">Время</th>
                <th className="border-b border-l border-gray-800 px-4 py-4">Статус</th>
                <th className="border-b border-l border-gray-800 px-4 py-4">Партия</th>
                <th className="border-b border-l border-gray-800 px-4 py-4">Сотрудник</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr className="text-1xl">
                  <td className="border-b border-l border-gray-800 px-4 py-4">{formatDateToString(item.CreateDate)}</td>
                  <td className="border-b border-l border-gray-800 px-4 py-4">{formatTimeToString(item.CreateDate)}</td>
                  <td className="border-b border-l border-gray-800 px-4 py-4 text-left">{item.stateDescription}</td>
                  <td className="border-b border-l border-gray-800 px-4 py-4">
                    {item.baseContain ? item.baseContain : "-"}
                  </td>
                  <td className="border-b border-l border-gray-800 px-4 py-4 text-left">{item.authorName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
