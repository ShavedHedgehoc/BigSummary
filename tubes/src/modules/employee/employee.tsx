import { useAuth } from "./use-auth";
import EmployeeBarcodeModal from "./employee-barcode-modal";

export default function Employee({ conveyor }: { conveyor: string }) {
  const { data, isSuccess } = useAuth(conveyor);
  return (
    <div className="flex flex-col flex-grow-0 gap-2 rounded-lg  bg-gray-900  px-4 py-4 justify-between">
      <EmployeeBarcodeModal conveyor_name={conveyor} />
      <div className="flex items-center text-slate-300 text-2xl ">Оператор</div>
      <div className="flex items-center text-slate-400">
        {isSuccess && (data.employee ? data.employee.name : "Не авторизован")}
      </div>
    </div>
  );
}
