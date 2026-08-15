import { useShallow } from "zustand/react/shallow";
import { useCansHistoryModalStore } from "../store/use-cans-history-modal-store";
import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import clsx from "clsx";
import CansHistoryTable from "./cans-history-table";

export default function CansHistoryModal() {
  const open = useCansHistoryModalStore(useShallow((state) => state.open));
  const setOpen = useCansHistoryModalStore(useShallow((state) => state.setOpen));
  const canName = useCansHistoryModalStore(useShallow((state) => state.canName));
  const setCanId = useCansHistoryModalStore(useShallow((state) => state.setCanId));
  const setCanName = useCansHistoryModalStore(useShallow((state) => state.setCanName));

  function handleClose() {
    setOpen(false);
    setCanId(null);
    setCanName("");
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className=" relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-900/60 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-0 text-center sm:items-center sm:p-0">
          <DialogPanel
            // className="relative h-1/3 transform overflow-hidden rounded-lg bg-slate-800 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-6xl data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            className=" space-y-4  bg-gray-950 p-2 rounded-lg w-2/3"
          >
            <div className="flex flex-col gap-6 px-4 py-4 h-[600px]">
              <div>
                <DialogTitle as="h3" className="text-2xl font-semibold text-slate-100 ">
                  Записи по ёмкости {canName}
                </DialogTitle>
              </div>
              <div className="flex  items-start w-full  rounded-xl  bg-gray-900  flex-grow">
                <CansHistoryTable />
              </div>
              <div className="flex w-full justify-end gap-4">
                <Button
                  className={clsx(
                    "rounded-md  py-3 px-4 w-32 h-full",
                    "flex flex-col gap-1 items-center justify-center",
                    "text-xl font-semibold",
                    "data-[disabled]:text-slate-400 data-[disabled]:bg-slate-700",
                    "data-[active]:text-slate-900 data-[active]:bg-slate-100",
                    "text-slate-200 bg-gray-900"
                  )}
                  onClick={() => handleClose()}
                >
                  Закрыть
                </Button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
