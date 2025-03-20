import { useParameter } from "./use-parameters";
import { useProduct } from "./use-product";

export default function ParameterTable({ conveyor, post }: { conveyor: string; post: string }) {
  const { data: product } = useProduct(conveyor);
  const { data: parameter, isSuccess: paramSuccess } = useParameter(product ? product.id : null);

  if (paramSuccess && !parameter) {
    return <div className="text-slate-300">Параметры не найдены</div>;
  }
  return (
    <div>
      {paramSuccess && parameter && post === "1" && (
        <table className="table-auto border border-collapse border-gray-400 w-full rounded-md text-slate-300">
          <thead className="">
            <tr>
              <th className=" rounded-tl-sm border border-gray-400 px-4 py-2">Скорость пресса, шт/мин</th>
              <th className="border border-gray-400 px-4 py-2">Время выдува, мс</th>
              <th className="border border-gray-400 px-4 py-2">Скорость токарного автомата, шт/мин</th>
              <th className="border border-gray-400 px-4 py-2">Температура печи отжига, С</th>
            </tr>
          </thead>
          <tbody className="rounded-b-sm">
            <tr>
              <td className="border border-gray-400 px-4 py-2 text-center">
                {parameter.press_speed_min} - {parameter.press_speed_max}
              </td>
              <td className="border border-gray-400 px-4 py-2 text-center">
                {parameter.molding_time_min} - {parameter.molding_time_max}
              </td>
              <td className="border border-gray-400 px-4 py-2 text-center">
                {parameter.turning_automate_speed_min} - {parameter.turning_automate_speed_max}
              </td>
              <td className="border border-gray-400 px-4 py-2 text-center">
                {parameter.annealing_furnace_temp_min} - {parameter.annealing_furnace_temp_max}
              </td>
            </tr>
          </tbody>
        </table>
      )}
      {paramSuccess && parameter && post === "2" && (
        <table className="table-auto border border-collapse border-gray-400 w-full rounded-md text-slate-300">
          <thead className="">
            <tr>
              <th className=" rounded-tl-sm border border-gray-400 px-4 py-2">Скорость колпачковой машины, шт/мин</th>
              <th className="border border-gray-400 px-4 py-2">Давление воздуха общее, Бар</th>
              <th className="border border-gray-400 px-4 py-2">Захваты вперед</th>
              <th className="border border-gray-400 px-4 py-2">Открытие захваты (лев)</th>
              <th className="border border-gray-400 px-4 py-2">Открытие захваты (прав)</th>
              <th className="border border-gray-400 px-4 py-2">Закрытие захвата</th>
              <th className="border border-gray-400 px-4 py-2">Начало впрыска А,В</th>
              <th className="border border-gray-400 px-4 py-2">Конец впрыска А,В</th>
              <th className="border border-gray-400 px-4 py-2">Положение тубы для впрыска (начало)</th>
              <th className="border border-gray-400 px-4 py-2">Положение тубы для впрыска (конец)</th>
            </tr>
          </thead>
          <tbody className="rounded-b-sm">
            <tr>
              <td className="border border-gray-400 px-4 py-2 text-center">
                {parameter.cap_machine_speed_min} - {parameter.cap_machine_speed_max}
              </td>
              <td className="border border-gray-400 px-4 py-2 text-center">
                {parameter.caps_machine_air_pressure_min} - {parameter.caps_machine_air_pressure_max}
              </td>
              <td className="border border-gray-400 px-4 py-2 text-center">
                {parameter.grips_forward_min} - {parameter.grips_forward_max}
              </td>
              <td className="border border-gray-400 px-4 py-2 text-center">
                {parameter.grips_opening_left_min} - {parameter.grips_opening_left_max}
              </td>
              <td className="border border-gray-400 px-4 py-2 text-center">
                {parameter.grips_opening_right_min} - {parameter.grips_opening_right_max}
              </td>
              <td className="border border-gray-400 px-4 py-2 text-center">
                {parameter.grips_closing_min} - {parameter.grips_closing_max}
              </td>
              <td className="border border-gray-400 px-4 py-2 text-center">
                {parameter.injection_start_min} - {parameter.injection_start_max}
              </td>
              <td className="border border-gray-400 px-4 py-2 text-center">
                {parameter.injection_end_min} - {parameter.injection_end_max}
              </td>
              <td className="border border-gray-400 px-4 py-2 text-center">
                {parameter.tube_start_position_min} - {parameter.tube_start_position_max}
              </td>
              <td className="border border-gray-400 px-4 py-2 text-center">
                {parameter.tube_end_position_min} - {parameter.tube_end_position_max}
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
