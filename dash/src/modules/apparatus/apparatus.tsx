import { useNavigate, useParams } from "react-router-dom";
import { RouteParams } from "../../shared/router/route-params";
import { useRecord } from "../../shared/api/use-record";
import InfoPage from "../../shared/components/info-page";
import { useEmployeeBarcodeInputModalStore } from "./store/use-employee-barcode-modal-store";
import { useShallow } from "zustand/react/shallow";
import EmployeeBarcodeModal from "./employee-barcode-modal";
import EmployeeErrorModal from "./employee-error-modal";
import clsx from "clsx";

export default function Apparatus() {
  const params = useParams<RouteParams.RECORD_PARAMS>();
  const recordId: string | undefined = params.record_id;
  const navigate = useNavigate();

  const { isSuccess, data } = useRecord(Number(recordId));
  const setOpen = useEmployeeBarcodeInputModalStore(useShallow((state) => state.setOpen));
  const setId = useEmployeeBarcodeInputModalStore(useShallow((state) => state.setId));

  const handleChangeStateButtonClick = () => {
    setId(Number(recordId));
    setOpen(true);
  };

  if (!recordId) {
    return <InfoPage message="Номeр строки отсутствует..." />;
  }

  return (
    <div className=" h-dvh bg-gray-950 overflow-hidden py-2">
      <EmployeeBarcodeModal />
      <EmployeeErrorModal />
      <div
        className={clsx(
          "absolute bottom-5 right-5 rounded-lg px-6 py-6",
          " z-9 flex  flex-row items-center justify-center",
          "font-semibold text-3xl",
          "data-[active]:text-slate-900 data-[active]:bg-slate-700",
          "text-slate-900 bg-slate-200   "
        )}
        onClick={() => navigate(-1)}
      >
        <div className="flex ">Назад</div>
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
            <div className="flex text-slate-200 justify-center items-center bg-sky-600 rounded-lg px-6 py-6 m-2">
              <div className=" flex justify-center text-4xl font-medium">Продезинфицирован </div>
            </div>

            <div
              className="text-slate-100 text-4xl bg-amber-600  rounded-lg  flex flex-shrink-1 justify-center items-center px-4 py-6 m-2 font-medium"
              onClick={() => handleChangeStateButtonClick()}
            >
              Изменить статус
            </div>
            <div className="flex flex-col text-slate-200 bg-slate-600 rounded-lg px-6 py-6 m-2 gap-4">
              <div className=" flex justify-start text-4xl font-medium">Регламент (Монопродукты и водные фазы)</div>
              <div className="flex flex-col gap-1">
                <div className=" flex justify-start text-3xl ">Температура подачи на фасовку, С: 25-30 </div>
                <div className=" flex justify-start text-3xl ">Перемешивание, об/мин: 30 об/мин </div>
                <div className=" flex justify-start text-3xl ">Среда в аппарате: аргон </div>
                <div className=" flex justify-start text-3xl ">Давление в аппарате: есть </div>
                <div className=" flex justify-start text-3xl ">Необходимость насоса: есть </div>
                <div className=" flex justify-start text-3xl ">Тип шланга: армированный нитью (для красок) </div>
                <div className=" flex justify-start text-3xl ">
                  Тип фильтра: AZUD (0,13 мм) стационарный на фас. оборудовании. Необходима предварительная
                  промывка/просушка
                </div>
              </div>
            </div>
            <div className="flex flex-col text-slate-200 bg-slate-600 rounded-lg px-6 py-6 m-2 gap-4">
              <div className=" flex justify-start text-4xl font-medium">Регламент (Органические фазы)</div>
              <div className="flex flex-col gap-1">
                <div className=" flex justify-start text-3xl ">Температура подачи на фасовку, С: 25-30 </div>
                <div className=" flex justify-start text-3xl ">Перемешивание, об/мин: 30 об/мин </div>
                <div className=" flex justify-start text-3xl ">Среда в аппарате: аргон </div>
                <div className=" flex justify-start text-3xl ">Давление в аппарате: есть </div>
                <div className=" flex justify-start text-3xl ">Необходимость насоса: есть </div>
                <div className=" flex justify-start text-3xl ">Тип шланга: армированный нитью (для красок) </div>
                <div className=" flex justify-start text-3xl ">
                  Тип фильтра: AZUD (0,13 мм) стационарный на фас. оборудовании. Необходима предварительная
                  промывка/просушка
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
