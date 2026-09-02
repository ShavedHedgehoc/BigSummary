import { useNavigate, useParams } from 'react-router-dom';
import { InfoPage, BackIcon } from '@/shared/ui';
import { trpc } from '@/shared/api';
import { RouteParams } from '@/shared/router';
import { RecordDetailWidget } from '@/widgets/record-detail';
import { RecordRegulationWidget } from '@/widgets/record-regulation';

export function RecordPage() {
  const params = useParams<RouteParams.RECORD_PARAMS>();
  const recordId: string | undefined = params.record_id;
  const navigate = useNavigate();

  const numericId = Number(recordId);
  const isValidId = recordId && !isNaN(numericId);

  const { data, isSuccess } = trpc.dash.main.doc.getDocRecord.useQuery(
    { recordId: numericId },
    {
      refetchInterval: 10000,
      enabled: !!isValidId,
    },
  );

  if (!isValidId) {
    return <InfoPage message="Номер строки отсутствует или неверный..." />;
  }

  if (!isSuccess || !data) {
    return <div className="h-dvh bg-gray-950 text-white p-5">Загрузка...</div>;
  }

  return (
    <div className=" h-dvh bg-gray-950 overflow-hidden py-2">
      <div
        className="absolute bottom-5 right-5 rounded-full w-24 h-24 z-50 flex items-center justify-center
        text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium "
        onClick={() => navigate(-1)}
      >
        <BackIcon />
      </div>
      <div className="overflow-y-auto  scrollbar-none h-full flex flex-col ">
        <div className="flex flex-col gap-3 p-3 ">
          <RecordDetailWidget record={data} />
          {data.regulation !== null && <RecordRegulationWidget regulation={data.regulation} />}
          <div className=" flex w-full p-4 flex-col gap-3 justify-between rounded-md bg-teal-700 text-slate-200">
            <div className="flex justify-start text-3xl ">Честный знак:</div>
            <div className="flex justify-start text-2xl">{data.dm}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
