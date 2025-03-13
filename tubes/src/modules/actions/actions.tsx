import React from "react";
import { useAuth } from "../employee/use-auth";
import { useLogout } from "../employee/use-logout";
import { useEmployeeBarcodeModalStore } from "../employee/store/use-employee-barcode-modal-store";
import { useShallow } from "zustand/react/shallow";
import { useLocation, useNavigate } from "react-router";
import { RouteNames } from "../../shared/router/route-names";
import clsx from "clsx";

export default function Actions({ conveyor, post }: { conveyor: string; post: string }) {
  const { data, isSuccess } = useAuth(conveyor);
  const logout = useLogout();
  const setOpen = useEmployeeBarcodeModalStore(useShallow((state) => state.setOpen));

  const navigate = useNavigate();
  const location = useLocation();
  return (
    <React.Fragment>
      <div className="flex flex-col w-full h-full items-center justify-between rounded-lg bg-gray-900 1border border-stone-600 px-4  gap-2 py-4">
        <div className="flex flex-col w-full items-center justify-start gap-2">
          <div
            className={clsx(
              "flex flex-row w-full min-h-24 items-center justify-center py-2 px-4 rounded-lg  text-1xl font-semibold",
              location.pathname !== RouteNames.HOME ? "bg-amber-600 text-slate-100" : "bg-slate-400 text-slate-600"
            )}
            onClick={() => navigate(`${RouteNames.HOME}?conveyor=${conveyor}&post=${post}`)}
          >
            Главная
          </div>
          <div
            className={clsx(
              "flex flex-row w-full min-h-24 items-center justify-center py-2 px-4 rounded-lg  text-1xl font-semibold",
              location.pathname !== RouteNames.COMPONENTS
                ? "bg-amber-600 text-slate-100"
                : "bg-slate-400 text-slate-600"
            )}
            onClick={() => navigate(`${RouteNames.COMPONENTS}?conveyor=${conveyor}&post=${post}`)}
          >
            Комплектующие
          </div>

          <div
            className={clsx(
              "flex flex-row w-full min-h-24 items-center justify-center py-2 px-4 rounded-lg  text-1xl font-semibold",
              location.pathname !== RouteNames.CHECKS ? "bg-amber-600 text-slate-100" : "bg-slate-400 text-slate-600"
            )}
            onClick={() => navigate(`${RouteNames.CHECKS}?conveyor=${conveyor}&post=${post}`)}
          >
            <div>Контроль</div>
          </div>
          <div
            className={clsx(
              "flex flex-row w-full min-h-24 items-center justify-center py-2 px-4 rounded-lg  text-1xl font-semibold",
              location.pathname !== RouteNames.REPORT ? "bg-amber-600 text-slate-100" : "bg-slate-400 text-slate-600"
            )}
            onClick={() => navigate(`${RouteNames.REPORT}?conveyor=${conveyor}&post=${post}`)}
          >
            <div>Отчет</div>
            <div>оператора</div>
          </div>
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
