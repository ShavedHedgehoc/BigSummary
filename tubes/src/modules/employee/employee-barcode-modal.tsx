import * as React from "react";

import { useShallow } from "zustand/react/shallow";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, Input } from "@headlessui/react";

import { useEmployeeBarcodeModalStore } from "./store/use-employee-barcode-modal-store";
import { useEmployee } from "./use-employee";
import { enqueueSnackbar } from "notistack";
import { ClientMessages } from "../../shared/resources/client-messages";
import { LoginDto } from "../../shared/api/services/auth-service";
import { useLogin } from "./use-login";

export default function EmployeeBarcodeModal({ conveyor_name }: { conveyor_name: string }) {
  const open = useEmployeeBarcodeModalStore(useShallow((state) => state.open));
  const setOpen = useEmployeeBarcodeModalStore(useShallow((state) => state.setOpen));

  const barcode = useEmployeeBarcodeModalStore(useShallow((state) => state.barcode));
  const setBarcode = useEmployeeBarcodeModalStore(useShallow((state) => state.setBarcode));
  const refInput = React.useRef<HTMLInputElement | null>(null);

  const { data } = useEmployee(barcode);

  const login = useLogin();

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (data) {
        setOpen(false);
        const dto: LoginDto = {
          conveyor_name: conveyor_name,
          employee_id: data.id,
        };
        login(dto);
        setBarcode("");
      } else {
        setOpen(false);
        setBarcode("");
        enqueueSnackbar(ClientMessages.EMPLOYEE_EXIT, {
          variant: "error",
          anchorOrigin: { vertical: "bottom", horizontal: "right" },
        });
      }
    }
  };

  return (
    <Dialog open={open} onClose={setOpen} initialFocus={refInput} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-900/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-0 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-slate-800 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="bg-slate-900 flex flex-col gap-6 px-6 py-4 ">
              <div>
                <DialogTitle as="h3" className="text-2xl font-semibold text-slate-100 ">
                  Отсканируйте бэйдж:
                </DialogTitle>
              </div>

              <Input
                className=" text-4xl w-full py-1 px-2 text-slate-900 rounded-lg focus:outline-none bg-slate-100"
                type="text"
                ref={refInput}
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                onKeyDown={(e) => handleInputKeyDown(e)}
              />
              <div
                className="flex flex-row items-center justify-center py-2 px-4 rounded-lg bg-amber-600 text-slate-100 text-1xl font-semibold"
                onClick={() => setOpen(false)}
              >
                Закрыть
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
