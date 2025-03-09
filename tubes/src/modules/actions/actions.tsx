import React from "react";
import { useAuth } from "../employee/use-auth";
import { useLogout } from "../employee/use-logout";
import { useEmployeeBarcodeModalStore } from "../employee/store/use-employee-barcode-modal-store";
import { useShallow } from "zustand/react/shallow";

export default function Actions({ conveyor }: { conveyor: string }) {
  const { data, isSuccess } = useAuth(conveyor);
  const logout = useLogout();
  const setOpen = useEmployeeBarcodeModalStore(useShallow((state) => state.setOpen));
  return (
    <React.Fragment>
      <div className="flex flex-col w-full h-full items-center justify-start rounded-lg bg-gray-900 1border border-stone-600 px-4  gap-2 py-4">
        <div
          className="flex flex-row w-full min-h-24 items-center justify-center py-2 px-4 rounded-lg bg-amber-600 text-slate-100 text-1xl font-semibold"
          // onClick={data?.employee ? () => logout(conveyor) : () => setOpen(true)}
        >
          Продукт
        </div>
        <div
          className="flex flex-row w-full min-h-24 items-center justify-center py-2 px-4 rounded-lg bg-amber-600 text-slate-100 text-1xl font-semibold"
          // onClick={data?.employee ? () => logout(conveyor) : () => setOpen(true)}
        >
          Статус
        </div>
        <div
          className="flex flex-col w-full min-h-24 items-center justify-center py-2 px-4 rounded-lg bg-amber-600 text-slate-100 text-1xl font-semibold"
          // onClick={data?.employee ? () => logout(conveyor) : () => setOpen(true)}
        >
          <div>Сканировать</div>
          <div>комплектующие</div>
        </div>
        <div
          className="flex flex-col w-full min-h-24 items-center justify-center py-2 px-4 rounded-lg bg-amber-600 text-slate-100 text-1xl font-semibold"
          // onClick={data?.employee ? () => logout(conveyor) : () => setOpen(true)}
        >
          {/* {isSuccess && (data.employee ? "Выйти" : "Авторизоваться")} */}
          <div>Операционный</div>
          <div>контроль</div>
        </div>
        <div
          className="flex flex-col w-full min-h-24 items-center justify-center py-2 px-4 rounded-lg bg-amber-600 text-slate-100 text-1xl font-semibold"
          // onClick={data?.employee ? () => logout(conveyor) : () => setOpen(true)}
        >
          <div>Отчет</div>
          <div>оператора</div>
        </div>
        <div
          className="flex flex-row w-full min-h-24 items-center justify-center py-2 px-4 rounded-lg bg-amber-600 text-slate-100 text-1xl font-semibold"
          onClick={data?.employee ? () => logout(conveyor) : () => setOpen(true)}
        >
          {isSuccess && (data.employee ? "Выйти" : "Авторизоваться")}
        </div>
      </div>
    </React.Fragment>
  );
}
