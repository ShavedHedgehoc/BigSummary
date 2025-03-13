import * as React from "react";
import { useShallow } from "zustand/react/shallow";
import { useBoilsInputStore } from "./store/use-boils-input-store";
import { useBoils } from "./use-boils";
import { useBoilsPaginationStore } from "./store/use-boils-pagination-store";
import clsx from "clsx";
import BarcodeIcon from "../../shared/components/icons/barcode-icon";
import { useBoilsBarcodeModalStore } from "./store/use-boils-barcode-modal-store";
// import clsx from "clsx";

export default function BoilsTable() {
  const filter = useBoilsInputStore(useShallow((state) => state.filter));
  const total = useBoilsPaginationStore(useShallow((state) => state.total));
  const setTotal = useBoilsPaginationStore(useShallow((state) => state.setTotal));
  const setPage = useBoilsPaginationStore(useShallow((state) => state.setPage));
  const limit = useBoilsPaginationStore(useShallow((state) => state.limit));
  const page = useBoilsPaginationStore(useShallow((state) => state.page));
  const setOpen = useBoilsBarcodeModalStore(useShallow((state) => state.setOpen));
  const setBoil = useBoilsBarcodeModalStore(useShallow((state) => state.setBoil));
  const setCode = useBoilsBarcodeModalStore(useShallow((state) => state.setCode));
  const setMarking = useBoilsBarcodeModalStore(useShallow((state) => state.setMarking));

  const { isPending, data, isSuccess } = useBoils({ filter: filter, limit: limit, page: page });

  const handleBarcodeButtonClick = ({ code, boil, marking }: { code: string; boil: string; marking: string }) => {
    setCode(code);
    setBoil(boil);
    setMarking(marking);
    setOpen(true);
  };

  React.useEffect(() => {
    if (data && data.total !== total) {
      setTotal(data.total);
      setPage(1);
    }
  }, [data?.total]);

  React.useEffect(() => {
    if (limit) {
      setPage(1);
    }
  }, [limit]);

  if (isPending) {
    return (
      <div className="flex flex-grow rounded-xl  items-center justify-center text-4xl text-slate-400 bg-gray-950">
        Loading
      </div>
    );
  }

  if (isSuccess && data.total === 0) {
    return (
      <div className="flex flex-grow rounded-xl  items-center justify-center text-4xl text-slate-400 bg-gray-950">
        Записи не найдены...
      </div>
    );
  }

  return (
    <div className="flex flex-grow rounded-xl border border-slate-900 bg-gray-950">
      {isSuccess && data.total > 0 && (
        <div className="h-0 min-h-full overflow-y-auto  w-full  rounded-xl  scrollbar-none border1 border-slate-600">
          <div className="h-full min-h-0 ">
            <table className="table-auto text-slate-300 w-full">
              <thead className="text-2xl sticky top-0 border-b border-slate-600  bg-gray-950">
                <tr>
                  <th className="border-b border-l1 border-slate-600 px-4 py-4">Код 1С</th>
                  <th className="border-b border-l border-slate-600 px-4 py-4">Артикул</th>
                  <th className="border-b border-l border-slate-600 px-4 py-4">Партия</th>
                  <th className="border-b border-l border-slate-600 px-4 py-4">Статус</th>
                  <th className="border-b border-l border-slate-600 px-4 py-4">Действия</th>
                </tr>
              </thead>

              <tbody>
                {data.rows.map((item) => (
                  <tr key={item.id} className={clsx("text-xl")}>
                    <td className="border-b  border-slate-600 px-4 py-2 text-center">{item.base_code}</td>
                    <td className="border-b border-l border-slate-600 px-4 py-4 ">{item.base_marking}</td>
                    <td className="border-b border-l border-slate-600 px-4 py-4 ">{item.value}</td>
                    <td
                      className={clsx(
                        "border-b border-l border-slate-600 px-4 py-4",
                        item.stateValue === "base_fail" && "text-red-600",
                        item.stateValue === "plug_pass" && "text-green-600",
                        item.stateValue === "base_continue" && "text-green-600",
                        item.stateValue === "base_check" && "text-amber-600",
                        item.stateValue === "base_correct" && "text-amber-600"
                      )}
                    >
                      {item.state}
                    </td>
                    <td className="border-b border-l border-slate-600 px-4 py-1">
                      <div
                        className="flex items-center justify-center  bg-slate-900 text-amber-600 rounded-md"
                        onClick={() =>
                          handleBarcodeButtonClick({
                            code: item.base_code,
                            boil: item.value,
                            marking: item.base_marking,
                          })
                        }
                      >
                        <BarcodeIcon size={12} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
