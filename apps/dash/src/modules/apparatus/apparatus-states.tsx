import { useNavigate, useParams } from "react-router-dom";
import { RouteParams } from "../../shared/router/route-params";
import { useRecord } from "../../shared/api/use-record";

export default function ApparatusStates() {
  const params = useParams<RouteParams.RECORD_PARAMS>();
  const recordId: string | undefined = params.record_id;
  const navigate = useNavigate();

  const { isSuccess, data } = useRecord(Number(recordId));

  return (
    <div className=" h-dvh bg-gray-950 overflow-hidden py-2">
      <div
        className="absolute bottom-5 right-5 rounded-lg  z-50 flex  flex-row items-center justify-center
        text-slate-100 bg-amber-600   font-medium text-4xl px-6 py-6"
        onClick={() => navigate(-1)}
      >
        <div className="flex ">Вернуться</div>
      </div>
      <div className="overflow-y-auto  scrollbar-none h-full flex flex-col ">
        {isSuccess && (
          <div className="flex flex-col">
            <div className="flex text-slate-200 justify-between items-center bg-slate-600 rounded-lg px-6 py-6 m-2">
              <div className=" flex justify-center text-4xl font-medium">Аппарат </div>
              <div className=" flex justify-center text-5xl font-medium"> {data.apparatus}</div>
            </div>
            <div className="flex text-slate-200 justify-between items-center bg-slate-600 rounded-lg px-6 py-6 m-2">
              <div className=" flex justify-center text-4xl font-medium">Конвейер </div>
              <div className=" flex justify-center text-5xl font-medium"> {data.apparatus}</div>
            </div>
            <div className="flex flex-col text-slate-200 bg-slate-600 rounded-lg px-6 py-6 m-2 gap-4">
              <div className=" flex justify-start text-4xl font-medium">Продукт</div>
              <div className="flex flex-col gap-1">
                <div className=" flex justify-start text-3xl ">Артикул P03/1000</div>
                <div className=" flex justify-start text-3xl ">Партия 1234A5</div>
              </div>
            </div>
            <div className="flex text-slate-200 justify-between items-center gap-6  bg-slate-600 rounded-lg px-6 py-6 m-2">
              <div className=" flex justify-center text-3xl font-semibold">Статус основы </div>
              <div className=" flex justify-center text-3xl font-semibold text-green-500"> Допуск на подключение</div>
            </div>

            <div
              className="text-slate-100 text-4xl bg-amber-600  rounded-lg  flex flex-shrink-1 justify-center items-center px-4 py-6 m-2 font-medium"
              onClick={() => navigate(-1)}
            >
              <div className=" flex justify-center text-4xl font-medium">Установить статус "Продезинфицирован" </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
