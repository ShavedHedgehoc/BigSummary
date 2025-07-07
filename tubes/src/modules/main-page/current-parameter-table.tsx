import { useParameter } from "./use-parameters";
import { useProduct } from "./use-product";

export default function CurrentParameterTable({ conveyor, post }: { conveyor: string; post: string }) {
  const { data: product } = useProduct(conveyor);
  const { data: parameter, isSuccess: paramSuccess } = useParameter(product ? product.id : null);

  if (paramSuccess && !parameter) {
    return <div className="text-slate-300">Параметры не найдены</div>;
  }

  return (
    <div className="flex flex-col w-1/2 text-slate-200 py-2 gap-2">
      <div className="text-2xl">Установленные параметры</div>
      {paramSuccess && parameter && post === "1" && (
        <table className="table-auto border border-collapse border-gray-400 w-full rounded-md text-slate-300">
          <thead className="h-18">
            <tr>
              <th className="rounded-tl-sm border border-gray-400 px-4 py-2">Параметр</th>
              <th className="border border-gray-400 px-4 py-2">Значение</th>
              <th className="border border-gray-400 px-4 py-2">Действие</th>
            </tr>
          </thead>
          <tbody className="rounded-b-sm">
            <tr className="h-18">
              <td className="border border-gray-400 px-4 py-2 text-center">Скорость пресса, шт/мин</td>
              <td className="border border-gray-400 px-4 py-2 text-center">
                {/* {parameter.press_speed_min} - {parameter.press_speed_max} */}
              </td>
              <td className="border border-gray-400 px-4 py-2 text-center">
                <div
                  className="flex flex-row w-full h-full items-center justify-center py-3 px-4 rounded-lg  text-1xl font-semibold  bg-amber-600 text-slate-100"
                  //   onClick={}
                >
                  #
                </div>
              </td>
            </tr>
            <tr className="h-18">
              <td className="border border-gray-400 px-4 py-2 text-center">Время выдува, мс</td>
              <td className="border border-gray-400 px-4 py-2 text-center">
                {/* {parameter.molding_time_min} - {parameter.molding_time_max} */}
              </td>
              <td className="border border-gray-400 px-4 py-2 text-center">
                <div
                  className="flex flex-row w-full h-full items-center justify-center py-3 px-4 rounded-lg  text-1xl font-semibold  bg-amber-600 text-slate-100"
                  //   onClick={}
                >
                  #
                </div>
              </td>
            </tr>
            <tr className="h-18">
              <td className="border border-gray-400 px-4 py-2 text-center">Скорость токарного автомата, шт/мин</td>
              <td className="border border-gray-400 px-4 py-2 text-center">
                {/* {parameter.turning_automate_speed_min} - {parameter.turning_automate_speed_max} */}
              </td>
              <td className="border border-gray-400 px-4 py-2 text-center">
                <div
                  className="flex flex-row w-full h-full items-center justify-center py-3 px-4 rounded-lg  text-1xl font-semibold  bg-amber-600 text-slate-100"
                  //   onClick={}
                >
                  #
                </div>
              </td>
            </tr>
            <tr className="h-18">
              <td className="border border-gray-400 px-4 py-2 text-center">Температура печи отжига, С</td>
              <td className="border border-gray-400 px-4 py-2 text-center">
                {/* {parameter.annealing_furnace_temp_min} - {parameter.annealing_furnace_temp_max} */}
              </td>
              <td className="border border-gray-400 px-4 py-2 text-center">
                <div
                  className="flex flex-row w-full h-full items-center justify-center py-3 px-4 rounded-lg  text-1xl font-semibold  bg-amber-600 text-slate-100"
                  //   onClick={}
                >
                  #
                </div>
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
