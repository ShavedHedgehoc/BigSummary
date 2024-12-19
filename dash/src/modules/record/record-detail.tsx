import { useNavigate, useParams } from "react-router-dom";
import { RouteParams } from "../../shared/router/route-params";
import BackIcon from "../../shared/components/icons/back-icon";
import { useRecord } from "../../shared/api/use-record";
import InfoPage from "../../shared/components/info-page";

export default function RecordDetail() {
  const params = useParams<RouteParams.RECORD_PARAMS>();
  const recordId: string | undefined = params.record_id;
  const navigate = useNavigate();

  const { isPending, isSuccess, data } = useRecord(Number(recordId));

  if (!recordId) {
    return <InfoPage message="Номeр строки отсутствует..." />;
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
      <div className="overflow-y-ршввут h-full">
        {/* <div className="text-slate-50 text-3xl">{`Данные по строке ${recordId}`}</div> */}

        {isSuccess && data && (
          <div className=" rounded-md bg-fuchsia-700 text-slate-200">
            <div className="text-5xl">{data.conveyor}</div>
            <div className="text-5xl">Конвейер</div>
          </div>
        )}
      </div>
    </div>
  );
}
