import * as React from "react";
import { useEmployeeBarcodeInputModalStore } from "./store/use-employee-barcode-modal-store";
import { useShallow } from "zustand/react/shallow";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, Input } from "@headlessui/react";

import { useEmployee } from "../../shared/api/use-employee";
import { useEmployeeErrorModalStore } from "./store/use-employee-error-modal-store";
import { useNavigate } from "react-router";
import { RouteNames } from "../../shared/router/route-names";

export default function EmployeeBarcodeModal() {
  const id = useEmployeeBarcodeInputModalStore(useShallow((state) => state.id));
  const open = useEmployeeBarcodeInputModalStore(useShallow((state) => state.open));
  const setOpen = useEmployeeBarcodeInputModalStore(useShallow((state) => state.setOpen));
  const setErrorOpen = useEmployeeErrorModalStore(useShallow((state) => state.setOpen));
  const barcode = useEmployeeBarcodeInputModalStore(useShallow((state) => state.barcode));
  const setBarcode = useEmployeeBarcodeInputModalStore(useShallow((state) => state.setBarcode));
  const refInput = React.useRef<HTMLInputElement | null>(null);
  const { data } = useEmployee(barcode);
  const navigate = useNavigate();

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (data) {
        setOpen(false);
        navigate(`${RouteNames.APPARATUS_STATE}/${id}`);
        setBarcode("");
      } else {
        setOpen(false);
        setBarcode("");
        setErrorOpen(true);
        setTimeout(() => {
          setErrorOpen(false);
        }, 3000);
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
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
