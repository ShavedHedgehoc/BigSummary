import clsx from "clsx";
import React from "react";
import { useSearchParams } from "react-router";
import { useAuth } from "../employee/use-auth";
import { useConveyorState } from "../state/use-conveyor-state";
import SelectRecordModal from "./select-record-modal";
import { useSelectRecordModalStore } from "./store/use-select-record-modal-store";
import { useShallow } from "zustand/react/shallow";
export default function MainPage() {
  let [searchParams] = useSearchParams();
  const conveyor = searchParams.get("conveyor");
  const post = searchParams.get("post");

  if (!conveyor || !post) {
    return (
      <div className="flex h-dvh flex-col items-center justify-center bg-gray-900 text-4xl text-slate-200">
        <div>No conveyor or post</div>
      </div>
    );
  }

  const { data: authData, isSuccess: authSuccess } = useAuth(conveyor);
  const { data: stateData, isSuccess: stateSuccess } = useConveyorState(conveyor);
  const setOpen = useSelectRecordModalStore(useShallow((state) => state.setOpen));
  const setConveyor = useSelectRecordModalStore(useShallow((state) => state.setConveyor));

  const mockChecks = [
    {
      id: 1,
      code: "063754",
      name: "Бушон РК 214F, белый (LOVE, CELEBRITY)",
      lot: "-",
      time: "14:36:15",
      post: 4,
    },
    {
      id: 2,
      code: "068813",
      name: "Рондоль D28*L129 (Алюмар 27,7*3,4 мм, Инкомпро 27,7*3,8 мм)",
      lot: "20365489759123658964",
      time: "14:36:15",
      post: 1,
    },
    {
      id: 3,
      code: "068972",
      name: "Внутренний лак бежевый (VPL Novacan T-IL300, Metlac 716401)",
      lot: "20365489759123658964",
      time: "14:36:15",
      post: 2,
    },
    {
      id: 4,
      code: "068815",
      name: "Внешний лак белый (МеталДекор эмаль CC-4215, VPL Novacan T-W 100/1)",
      lot: "20365489759123658964",
      time: "14:36:15",
      post: 2,
    },
    {
      id: 5,
      code: "068971",
      name: "Латекс (VPL Novacan T-D 125)",
      lot: "-",
      time: "14:36:15",
      post: 2,
    },
    {
      id: 6,
      code: "067972",
      name: "Ожиритель (стеарат цинка, арахинат цинка)",
      lot: "20365489759123658964",
      time: "14:36:15",
      post: 1,
    },
    {
      id: 7,
      code: "069193",
      name: "Краска Синия TV-Pantone 2758C",
      lot: "20365489759123658964",
      time: "14:36:15",
      post: 2,
    },
    {
      id: 1,
      code: "068817",
      name: "Растворитель (BS-277, VPL Novacan V600, VPL Novacan V200, Metlac 766015)",
      lot: "20365489759123658964",
      time: "14:36:15",
      post: 1,
    },
  ];

  const handleSelectProductButtonClick = () => {
    if (authSuccess && authData && stateSuccess && !stateData) {
      setConveyor(conveyor);
      setOpen(true);
    }
  };
  return (
    <React.Fragment>
      <SelectRecordModal />
      <div className="flex flex-col w-full flex-shrink h-full items-center justify-start rounded-lg bg-gray-900 1border border-stone-600 px-4  gap-2 py-4">
        <div className="flex text-2xl text-slate-300 py-2 px-4 ">Продукт</div>
        <div className="flex flex-row h-full w-full gap-2 ">
          <div className="flex flex-col w-full px-2 gap-1 text-1xl ">
            <div className="text-slate-300 text-3xl">030874 Туба LOVE 50 мл D 28 мм металлическая</div>
            <div className="text-slate-300">Партия: 235В</div>
            <div className="text-slate-300">План: 10000</div>
            <div className="text-slate-300">Выпуск: 2400</div>

            <div className="text-slate-400 flex w-full ">
              <table className="table-auto border border-collapse border-gray-400 w-full rounded-md">
                <thead className="">
                  <th className=" rounded-tl-sm border border-gray-400 px-4 py-2">Скорость пресса</th>
                  <th className="border border-gray-400 px-4 py-2">Время выдува</th>
                  <th className="border border-gray-400 px-4 py-2">Скорость токарного автомата</th>
                  <th className="border border-gray-400 px-4 py-2">Температура печи отжига</th>
                  <th className="border border-gray-400 px-4 py-2">Тип рондоли</th>
                </thead>
                <tbody className="rounded-b-sm">
                  <tr>
                    <td className="border border-gray-400 px-4 py-2 text-center">70-80 шт/мин</td>
                    <td className="border border-gray-400 px-4 py-2 text-center">70-80 шт/мин</td>
                    <td className="border border-gray-400 px-4 py-2 text-center">70-80 шт/мин</td>
                    <td className="border border-gray-400 px-4 py-2 text-center">70-80 шт/мин</td>
                    <td className="border border-gray-400 px-4 py-2 text-center">70-80 шт/мин</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-col w-1/6 ">
            <img className="rounded-md  object-fill" src={"30874 201222.jpg"} />
          </div>
        </div>
        <div className="text-slate-300 text-5xl">ЖМАКНИ ПИМПУ!</div>

        <div className="flex flex-row w-full h-1/6 justify-between items-center rounded-md px-4 py-4 bg-gray-800 ">
          <div
            className={clsx(
              "flex flex-row w-48 min-h-24 items-center justify-center py-2 px-4 rounded-lg  text-1xl font-semibold",
              authSuccess && authData && stateSuccess && !stateData
                ? "bg-amber-600 text-slate-100"
                : "bg-gray-600 text-slate-300"
            )}
            onClick={() => handleSelectProductButtonClick()}
          >
            <div>Выбрать продукт</div>
          </div>
          <div className="flex flex-row gap-2">
            <div
              className={clsx(
                "flex flex-row w-48 min-h-24 items-center justify-center py-2 px-4 rounded-lg  text-1xl font-semibold",
                "bg-amber-600 text-slate-100"
                // location.pathname !== RouteNames.CHECKS ? "bg-amber-600 text-slate-100" : "bg-slate-400 text-slate-600"
              )}
              // onClick={() => navigate(`${RouteNames.CHECKS}?conveyor=${conveyor}&post=${post}`)}
            >
              <div>Запуск</div>
            </div>
            <div
              className={clsx(
                "flex flex-row  w-48 min-h-24 items-center justify-center py-2 px-4 rounded-lg  text-1xl font-semibold",
                "bg-amber-600 text-slate-100"
                // location.pathname !== RouteNames.CHECKS ? "bg-amber-600 text-slate-100" : "bg-slate-400 text-slate-600"
              )}
              // onClick={() => navigate(`${RouteNames.CHECKS}?conveyor=${conveyor}&post=${post}`)}
            >
              <div>Закончить</div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
