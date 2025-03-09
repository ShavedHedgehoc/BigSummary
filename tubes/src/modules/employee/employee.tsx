import { useShallow } from "zustand/react/shallow";
import { useAuth } from "./use-auth";
import { useLogout } from "./use-logout";
import { useEmployeeBarcodeModalStore } from "./store/use-employee-barcode-modal-store";
import EmployeeBarcodeModal from "./employee-barcode-modal";

export default function Employee({ conveyor }: { conveyor: string }) {
  const { data, isSuccess } = useAuth(conveyor);
  // const logout = useLogout();
  // const setOpen = useEmployeeBarcodeModalStore(useShallow((state) => state.setOpen));
  return (
    <div className="flex flex-col flex-grow-0 gap-2 rounded-lg  bg-gray-900  px-4 py-4 justify-between">
      <EmployeeBarcodeModal conveyor_name={conveyor} />
      <div className="flex items-center text-slate-300 text-2xl ">Оператор</div>
      <div className="flex items-center text-slate-400">
        {isSuccess && (data.employee ? data.employee.name : "Not authorized")}
      </div>
      {/* <div
        className="flex flex-row items-center justify-center py-2 px-4 rounded-lg bg-amber-600 text-slate-100 text-1xl font-semibold"
        onClick={data?.employee ? () => logout(conveyor) : () => setOpen(true)}
      >
        {isSuccess && (data.employee ? "Выйти" : "Авторизоваться")}
      </div> */}
    </div>
  );
}
