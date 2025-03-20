import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { useSelectRecordModalStore } from "./store/use-select-record-modal-store";
import { useShallow } from "zustand/react/shallow";
import { clsx } from "clsx";
import { useActiveRecords } from "./use-active-records";
import { formatDateToString } from "../../shared/helpers/dateUtils";
import { CreateTubeHistoryDto } from "../../shared/api/services/history-service";
import { useAuth } from "../employee/use-auth";
import { useSetActiveRecord } from "../../shared/api/use-set-active-record";
import { SetActiveRecordDto } from "../../shared/api/services/record-service";

export default function SelectRecordModal() {
  const open = useSelectRecordModalStore(useShallow((state) => state.open));
  const checkedId = useSelectRecordModalStore(useShallow((state) => state.checkedId));
  const conveyor = useSelectRecordModalStore(useShallow((state) => state.conveyor));
  const setOpen = useSelectRecordModalStore(useShallow((state) => state.setOpen));
  const setCheckedId = useSelectRecordModalStore(useShallow((state) => state.setCheckedId));

  const { data, isSuccess, isPending } = useActiveRecords(conveyor);
  // const { data: authData, isSuccess: authSuccess } = useAuth(conveyor);
  const { setActiveRecord } = useSetActiveRecord();

  const handleSetButtonClick = () => {
    setOpen(false);
    if (checkedId && conveyor) {
      const dto: SetActiveRecordDto = {
        record_id: checkedId.id,
        conveyor_name: conveyor,
      };
      setActiveRecord(dto);
    }
    // if (authSuccess && authData && checkedId) {
    //   const dto: CreateTubeHistoryDto = {
    //     history_type: "",
    //     record_id: checkedId.id,
    //     employee_id: authData.employee.id,
    //   };
    // }
    setCheckedId(null);
  };

  const handleCancelButtonClick = () => {
    setCheckedId(null);
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-900/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-0 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-slate-800 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-6xl data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="bg-slate-800 flex flex-col gap-6 px-6 py-4 ">
              <div>
                <DialogTitle as="h3" className="text-2xl font-semibold text-slate-100 ">
                  Выберите строку сводки
                </DialogTitle>
              </div>
              <div className="flex  items-start w-full h-128 rounded-xl border border-slate-600  ">
                {isPending && (
                  <div className="h-0 min-h-full overflow-y-auto  w-full  rounded-xl  scrollbar-none">
                    <div className="h-full min-h-0 text-slate-300">Loading...</div>
                  </div>
                )}
                {isSuccess && data.length > 0 && (
                  <div className="h-0 min-h-full overflow-y-auto  w-full  rounded-xl  scrollbar-none">
                    <div className="h-full min-h-0 ">
                      <table className="table-auto text-slate-300 w-full">
                        <thead className="text-xs sticky top-0 border-b border-slate-600  bg-slate-800">
                          <th className="border-b border-l border-slate-600 px-4 py-4">Код 1С</th>
                          <th className="border-b border-l border-slate-600 px-4 py-4">Наименование</th>
                          <th className="border-b border-l border-slate-600 px-4 py-4">Партия</th>
                          <th className="border-b border-l border-slate-600 px-4 py-4">Дата производства</th>
                        </thead>

                        <tbody>
                          {data.map((item) => (
                            <tr
                              className={clsx(
                                "text-xs",
                                item.id === checkedId?.id && "bg-teal-100 text-slate-900 font-semibold"
                              )}
                              onClick={() => setCheckedId(item)}
                            >
                              <td className="border-b border-l border-slate-600 px-4 py-4">{item.product_id}</td>
                              <td className="border-b border-l border-slate-600 px-4 py-4">{item.product_name}</td>
                              <td className="border-b border-l border-slate-600 px-4 py-4">{item.boil_value}</td>
                              <td className="border-b border-l border-slate-600 px-4 py-4">
                                {formatDateToString(item.start_date)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-row w-full gap-2 justify-end">
                <div
                  className="flex flex-row w-32 items-center justify-center py-2 px-4 rounded-lg bg-purple-300 text-slate-50 text-1xl font-semibold"
                  onClick={() => handleSetButtonClick()}
                >
                  Установить
                </div>
                <div
                  className="flex flex-row w-32 items-center justify-center py-2 px-4 rounded-lg bg-indigo-500 text-white text-1xl font-semibold"
                  onClick={() => handleCancelButtonClick()}
                >
                  Закрыть
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
