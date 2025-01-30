import { useNavigate, useParams } from "react-router-dom";
import { RouteParams } from "../../shared/router/route-params";
import BackIcon from "../../shared/components/icons/back-icon";
import { useRecord } from "../../shared/api/use-record";
import InfoPage from "../../shared/components/info-page";
import RegulationDetail from "./regulation-detail";

export default function RecordDetail() {
  const params = useParams<RouteParams.RECORD_PARAMS>();
  const recordId: string | undefined = params.record_id;
  const navigate = useNavigate();

  const { isSuccess, data } = useRecord(Number(recordId));

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
      <div className="overflow-y-auto h-full flex flex-col ">
        {isSuccess && (
          <>
            <div className="flex flex-col gap-3 p-3 ">
              {/* <div className="h-36 w-full p-4 flex flex-col  justify-center rounded-md bg-teal-700 text-slate-200">
                <div className="flex justify-center items-center text-6xl ">Сводка</div>
              </div> */}
              <div className="w-full p-4 flex flex-col  justify-between rounded-md bg-orange-700 text-slate-200">
                <div className="flex justify-start text-3xl ">Конвейер</div>
                <div className="flex justify-end text-6xl">{data.conveyor}</div>
              </div>
              <div className="flex flex-row gap-3">
                <div className=" flex w-1/2 p-4 flex-col justify-between rounded-md bg-green-700 text-slate-200">
                  <div className="flex justify-start text-3xl ">Продукт</div>
                  <div className="flex justify-end text-5xl">{data.product}</div>
                </div>
                <div className=" flex w-1/2 p-4 flex-col justify-between rounded-md bg-sky-700 text-slate-200">
                  <div className="flex justify-start text-3xl ">Код 1С</div>
                  <div className="flex justify-end text-5xl">{data.productId}</div>
                </div>
              </div>
              <div className="flex flex-row gap-3">
                <div className=" flex w-1/3 p-4 flex-col justify-between rounded-md bg-yellow-700 text-slate-200">
                  <div className="flex justify-start text-3xl ">Партия</div>
                  <div className="flex justify-end text-5xl">{data.boil}</div>
                </div>
                <div className=" flex w-1/3 p-4 flex-col justify-between rounded-md bg-pink-700 text-slate-200">
                  <div className="flex justify-start text-3xl ">План</div>
                  <div className="flex justify-end text-5xl">{data.plan}</div>
                </div>
                <div className=" flex w-1/3 p-4 flex-col justify-between rounded-md bg-lime-700 text-slate-200">
                  <div className="flex justify-start text-3xl ">Годен до</div>
                  <div className="flex justify-end text-5xl">{data.bbf}</div>
                </div>
              </div>
              {(data.apparatus !== "-" || data.can !== "-") && (
                <div className="flex flex-row gap-3">
                  <div className=" flex w-1/2 p-4 flex-col justify-between rounded-md bg-cyan-700 text-slate-200">
                    <div className="flex justify-start text-3xl ">Апарат</div>
                    <div className="flex justify-end text-5xl">{data.apparatus}</div>
                  </div>
                  <div className=" flex w-1/2 p-4 flex-col justify-between rounded-md bg-amber-700 text-slate-200">
                    <div className="flex justify-start text-3xl ">Емкость</div>
                    <div className="flex justify-end text-5xl">{data.can}</div>
                  </div>
                </div>
              )}
              <div className=" flex w-full p-4 flex-col gap-3 justify-between rounded-md bg-teal-700 text-slate-200">
                <div className="flex justify-start text-3xl ">Комментарий:</div>
                <div className="flex justify-start text-2xl">{data.note}</div>
              </div>
              {/* <div className="h-36 w-full p-4 flex flex-col  justify-center rounded-md bg-teal-700 text-slate-200">
                <div className="flex justify-center items-center text-6xl ">Статус</div>
              </div> */}
              <div
                className={`flex w-full p-4 flex-col justify-center items-center rounded-md 
              ${data.stateValue === "product_pass" && "bg-green-700"} 
        ${(data.stateValue === "product_check" || data.stateValue === "product_correct") && "bg-yellow-700"} 
        ${data.stateValue === "product_fail" && "bg-red-700"} 
        ${
          (data.stateValue === "base_correct" ||
            data.stateValue === "base_continue" ||
            data.stateValue === "plug_pass" ||
            data.stateValue === "base_check" ||
            data.stateValue === null ||
            data.stateValue === "base_fail") &&
          "bg-slate-600"
        }              
        ${data.stateValue === "product_finished" && "bg-fuchsia-700"}
        ${data.stateValue === "product_in_progress" && "bg-sky-700"}
        
              
              `}
              >
                <div
                  className={`font-ultralight text-5xl  pl-3  p-4 ${
                    data.stateValue === "base_check" ||
                    data.stateValue === "base_correct" ||
                    data.stateValue === "base_continue"
                      ? "text-yellow-500"
                      : data.stateValue === "base_fail"
                      ? "text-red-500"
                      : data.stateValue === "plug_pass"
                      ? "text-green-500"
                      : "text-slate-200"
                  }`}
                >
                  {data.state}
                </div>
              </div>
            </div>
            <RegulationDetail productId={data.productId} />
          </>
        )}
      </div>
    </div>
  );
}
