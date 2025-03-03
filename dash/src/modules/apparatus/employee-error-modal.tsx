import { useShallow } from "zustand/react/shallow";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { useEmployeeErrorModalStore } from "./store/use-employee-error-modal-store";

export default function EmployeeErrorModal() {
  const open = useEmployeeErrorModalStore(useShallow((state) => state.open));
  const setOpen = useEmployeeErrorModalStore(useShallow((state) => state.setOpen));

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
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="bg-slate-900 flex flex-col gap-6 px-6 py-4 ">
              <div>
                <DialogTitle as="h3" className="text-2xl font-semibold text-slate-100 ">
                  Ошибка!
                </DialogTitle>
                <div className="text-xl font-semibold text-slate-200 mt-2">
                  <p>Пользователь с таким штрихкодом не найден!</p>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
