import { useShallow } from 'zustand/react/shallow';

import { formatDateToString, formatTimeToString } from '@/shared/lib';
import { trpc } from '@/shared/api';
import { useCanHistoryModalStore } from '@/entities/can';

export function CanHistoryTable() {
  const canId = useCanHistoryModalStore(useShallow((state) => state.canId));
  const numericId = Number(canId);
  const isValidId = canId && !isNaN(numericId);

  const { data, isSuccess, isLoading } =
    trpc.dash.trace.canRecord.getLastCanRecordListByCanId.useQuery(
      { canId: numericId },
      {
        refetchInterval: 10000,
        enabled: !!isValidId,
      },
    );

  if (isLoading) {
    return (
      <div className="h-0 min-h-full overflow-y-auto  w-full  rounded-xl  scrollbar-none">
        <div className="h-full min-h-0 text-slate-200 font-semibold flex items-center justify-center">
          Загружаю...
        </div>
      </div>
    );
  }

  if (isSuccess && data?.length === 0) {
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
            <thead className="text-2xl sticky top-0 border-b border--600  bg-gray-900">
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
                <tr className="text-1xl" key={`row${item.CreateDate}`}>
                  <td className="border-b  border-gray-800 px-4 py-4 text-center">
                    {formatDateToString(item.CreateDate)}
                  </td>
                  <td className="border-b border-l border-gray-800 px-4 py-4 text-center">
                    {formatTimeToString(item.CreateDate)}
                  </td>
                  <td className="border-b border-l border-gray-800 px-4 py-4 text-center">
                    {item.stateDescription}
                  </td>
                  <td className="border-b border-l border-gray-800 px-4 py-4 text-center">
                    {item.baseContain ? item.baseContain : '-'}
                  </td>
                  <td className="border-b border-l border-gray-800 px-4 py-4 text-center">
                    {item.authorName}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
