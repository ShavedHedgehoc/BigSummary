import { useRegulation } from "../../shared/api/use-regulation";

export default function RegulationDetail({ productId }: { productId: string }) {
  const { isSuccess, data } = useRegulation(productId);

  return (
    <div className="flex flex-col gap-3 p-3 pt-0">
      {/* <div className="h-36 w-full p-4 flex flex-col  justify-center rounded-md bg-teal-700 text-slate-200">
        <div className="flex justify-center items-center text-6xl ">Регламент</div>
      </div> */}
      {isSuccess && (
        <div className="flex flex-row gap-3 ">
          <div className="flex flex-col  w-3/4 flex-grow gap-3">
            {(data.water_base_min_weight !== "0" || data.water_base_max_weight !== "0") && (
              <div className="flex flex-row flex-grow gap-3">
                {data.water_base_min_weight !== "0" && (
                  <div className=" flex flex-grow w-1/2 p-4 flex-col justify-between rounded-md bg-sky-700 text-slate-200">
                    <div className="flex justify-start text-3xl ">Мин. вес водной фазы</div>
                    <div className="flex justify-end text-5xl">{data.water_base_min_weight}</div>
                  </div>
                )}
                {data.water_base_max_weight !== "0" && (
                  <div className=" flex  flex-grow w-1/2 p-4 flex-col justify-between rounded-md bg-green-700 text-slate-200">
                    <div className="flex justify-start text-3xl ">Макс. вес водной фазы</div>
                    <div className="flex justify-end text-5xl">{data.water_base_max_weight}</div>
                  </div>
                )}
              </div>
            )}
            {(data.per_box !== 0 || data.box_per_row !== 0 || data.row_on_pallet !== 0) && (
              <div className="flex flex-row flex-grow gap-3">
                {data.per_box !== 0 && (
                  <div className=" flex  flex-grow w-1/3 p-4 flex-col justify-between rounded-md bg-lime-700 text-slate-200">
                    <div className="flex justify-start text-3xl ">В коробе</div>
                    <div className="flex justify-end text-5xl">{data.per_box}</div>
                  </div>
                )}
                {data.box_per_row !== 0 && (
                  <div className=" flex  flex-grow w-1/3 p-4 flex-col justify-between rounded-md bg-pink-700 text-slate-200">
                    <div className="flex justify-start text-3xl ">Коробов в ряду</div>
                    <div className="flex justify-end text-5xl">{data.box_per_row}</div>
                  </div>
                )}
                {data.row_on_pallet !== 0 && (
                  <div className=" flex flex-grow w-1/3 p-4 flex-col justify-between rounded-md bg-yellow-700 text-slate-200">
                    <div className="flex justify-start text-3xl ">Рядов на паллете</div>
                    <div className="flex justify-end text-5xl">{data.row_on_pallet}</div>
                  </div>
                )}
              </div>
            )}
            {(data.gasket || data.seal) && (
              <div className="flex flex-row flex-grow gap-3">
                {data.gasket && (
                  <div className=" flex flex-grow w-1/2 p-4 flex-col  gap-3 rounded-md bg-amber-700 text-slate-200">
                    <div className="flex justify-start text-3xl ">Прокладка:</div>
                    <div className="flex justify-left items-center text-2xl ">{data.gasket ? data.gasket : " "}</div>
                  </div>
                )}
                {data.seal && (
                  <div className=" flex w-1/2 p-4 flex-col justify-center rounded-md bg-cyan-700 text-slate-200">
                    <div className="flex justify-center items-center text-4xl ">"Не запечатываем"</div>
                  </div>
                )}
              </div>
            )}
            {data.technician_note && (
              <div className=" flex w-full p-4 flex-col  flex-grow gap-3 justify-start rounded-md bg-green-700 text-slate-200">
                <div className="flex justify-start text-3xl ">Примечания для техников:</div>
                <div className="flex justify-start text-2xl">{data.technician_note ? data.technician_note : " "}</div>
              </div>
            )}
            {data.packaging_note && (
              <div className=" flex w-full p-4 flex-col  flex-grow gap-3 justify-start rounded-md bg-cyan-700 text-slate-200">
                <div className="flex justify-start text-3xl ">Примечания для фасовки:</div>
                <div className="flex justify-start text-2xl">{data.packaging_note ? data.packaging_note : " "}</div>
              </div>
            )}
          </div>
          {data.marking_sample_value && (
            <div className="flex w-1/4  flex-col  justify-between p-4  gap-4 rounded-md bg-orange-700 text-slate-200">
              <div className="flex justify-start text-3xl ">Маркировка</div>
              <img
                className="object-fill rounded-md"
                alt={`http://ones-esb-vm:9000/manufacturing/templates/marking/${data.marking_sample_value}.jpg`}
                src={`http://ones-esb-vm:9000/manufacturing/templates/marking/${data.marking_sample_value}.jpg`}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
