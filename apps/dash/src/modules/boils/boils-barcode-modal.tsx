import { useShallow } from "zustand/react/shallow";
import { useBoilsBarcodeModalStore } from "./store/use-boils-barcode-modal-store";
import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import clsx from "clsx";
import { ReactBarcode } from "react-jsbarcode";

export default function BoilsBarcodeModal() {
  const open = useBoilsBarcodeModalStore(useShallow((state) => state.open));
  const boil = useBoilsBarcodeModalStore(useShallow((state) => state.boil));
  const code = useBoilsBarcodeModalStore(useShallow((state) => state.code));
  const marking = useBoilsBarcodeModalStore(useShallow((state) => state.marking));
  const setOpen = useBoilsBarcodeModalStore(useShallow((state) => state.setOpen));
  const setBoil = useBoilsBarcodeModalStore(useShallow((state) => state.setBoil));
  const setCode = useBoilsBarcodeModalStore(useShallow((state) => state.setCode));
  const setMarking = useBoilsBarcodeModalStore(useShallow((state) => state.setMarking));

  const handleClose = () => {
    setOpen(false);
    setBoil("");
    setCode("");
    setMarking("");
  };

  return (
    <Dialog open={open} onClose={() => handleClose()} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-900/60 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className=" space-y-4  bg-gray-950 p-2 rounded-lg ">
          <div className=" flex flex-col gap-6 px-4 py-4 ">
            <div>
              <DialogTitle as="h3" className="text-2xl font-semibold text-slate-100 ">
                {`Продукт - ${marking}, Партия -  ${boil}`}
              </DialogTitle>
            </div>
            <div className="flex flex-row justify-center gap-4 bg-slate-950">
              <ReactBarcode
                value={`(${boil})(999)(9999/)(${code})`}
                options={{ format: "code128", background: "#030712", lineColor: "#cbd5e1", displayValue: false }}
              />
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
    </Dialog>
  );
}
