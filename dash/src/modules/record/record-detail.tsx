import { useNavigate, useParams } from "react-router-dom";
import { RouteParams } from "../../shared/router/route-params";
import BackIcon from "../../shared/components/icons/back-icon";
import { useRecord } from "../../shared/api/use-record";
import InfoPage from "../../shared/components/info-page";
// import RegulationDetail from "./regulation-detail";

export default function RecordDetail() {
  const params = useParams<RouteParams.RECORD_PARAMS>();
  const recordId: string | undefined = params.record_id;
  const navigate = useNavigate();

  const { isSuccess, data } = useRecord(Number(recordId));

  if (!recordId) {
    return <InfoPage message="Номeр строки отсутствует..." />;
  }

  return (
    <div className=" h-dvh bg-gray-950 overflow-hidden py-2">
      <div
        className="absolute bottom-5 right-5 rounded-full w-24 h-24 z-50 flex items-center justify-center
        text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium "
        onClick={() => navigate(-1)}
      >
        <BackIcon />
      </div>
      <div className="overflow-y-auto  scrollbar-none h-full flex flex-col ">
        {isSuccess && (
          <div className="flex flex-col gap-3 p-3 ">
            <div className="w-full p-4 flex flex-col  justify-between rounded-md bg-orange-700 text-slate-200">
              <div className="flex justify-start text-3xl ">Конвейер</div>
              <div className="flex justify-end text-6xl">{data.conveyor}</div>
            </div>
            <div className="flex flex-row gap-3">
              <div className=" flex w-1/2 p-4 flex-col justify-between rounded-md bg-green-700 text-slate-200">
                <div className="flex justify-start text-3xl ">Продукт</div>
                <div className="flex justify-end text-5xl">{data.product}</div>
              </div>
              <div className=" flex w-1/2 p-4 flex-col justify-between rounded-md bg-sky-700 text-slate-200">
                <div className="flex justify-start text-3xl ">Код 1С</div>
                <div className="flex justify-end text-5xl">{data.productId}</div>
              </div>
            </div>
            <div className="flex flex-row gap-3">
              <div className=" flex w-1/3 p-4 flex-col justify-between rounded-md bg-yellow-700 text-slate-200">
                <div className="flex justify-start text-3xl ">Партия</div>
                <div className="flex justify-end text-5xl">{data.boil}</div>
              </div>
              <div className=" flex w-1/3 p-4 flex-col justify-between rounded-md bg-pink-700 text-slate-200">
                <div className="flex justify-start text-3xl ">План</div>
                <div className="flex justify-end text-5xl">{data.plan}</div>
              </div>
              <div className=" flex w-1/3 p-4 flex-col justify-between rounded-md bg-lime-700 text-slate-200">
                <div className="flex justify-start text-3xl ">Годен до</div>
                <div className="flex justify-end text-5xl">{data.bbf}</div>
              </div>
            </div>
            {(data.apparatus !== "-" || data.can !== "-") && (
              <div className="flex flex-row gap-3">
                <div className=" flex w-1/2 p-4 flex-col justify-between rounded-md bg-cyan-700 text-slate-200">
                  <div className="flex justify-start text-3xl ">Апарат</div>
                  <div className="flex justify-end text-5xl">{data.apparatus}</div>
                </div>
                <div className=" flex w-1/2 p-4 flex-col justify-between rounded-md bg-amber-700 text-slate-200">
                  <div className="flex justify-start text-3xl ">Емкость</div>
                  <div className="flex justify-end text-5xl">{data.can}</div>
                </div>
              </div>
            )}
            <div className=" flex w-full p-4 flex-col gap-3 justify-between rounded-md bg-teal-700 text-slate-200">
              <div className="flex justify-start text-3xl ">Комментарий:</div>
              <div className="flex justify-start text-2xl">{data.note}</div>
            </div>
            <div
              className={`flex w-full p-4 flex-col justify-center items-center rounded-md 
              ${data.stateValue === "product_pass" && "bg-green-700"} 
              ${(data.stateValue === "product_check" || data.stateValue === "product_correct") && "bg-yellow-700"} 
              ${data.stateValue === "product_fail" && "bg-red-700"} 
              ${
                (data.stateValue === "base_correct" ||
                  data.stateValue === "base_continue" ||
                  data.stateValue === "plug_pass" ||
                  data.stateValue === "base_check" ||
                  data.stateValue === null ||
                  data.stateValue === "base_fail") &&
                "bg-slate-600"
              }              
              ${data.stateValue === "product_finished" && "bg-fuchsia-700"}
              ${data.stateValue === "product_in_progress" && "bg-sky-700"}
              `}
            >
              <div
                className={`font-ultralight text-5xl  pl-3  p-4 ${
                  data.stateValue === "base_check" ||
                  data.stateValue === "base_correct" ||
                  data.stateValue === "base_continue"
                    ? "text-yellow-500"
                    : data.stateValue === "base_fail"
                    ? "text-red-500"
                    : data.stateValue === "plug_pass"
                    ? "text-green-500"
                    : "text-slate-200"
                }`}
              >
                {data.state}
              </div>
            </div>
            {data.semiProducts.length > 0 && (
              <div className=" flex  flex-grow w-full p-4 gap-5 flex-col justify-between rounded-md bg-orange-700 text-slate-200">
                <div className="flex justify-start text-3xl">Полупродукты:</div>
                <div className="flex flex-col gap-3">
                  {data.semiProducts.map((item) => (
                    <div className="flex justify-start text-2xl" key={item.code}>
                      {item.code} {item.marking} {item.boil_value}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {data.regulation && (
              <div className="flex flex-row gap-3 ">
                <div className="flex flex-col  w-3/4 flex-grow gap-3">
                  {(data.regulation.water_base_min_weight !== "NaN" ||
                    data.regulation.water_base_max_weight !== "NaN") && (
                    <div className="flex flex-row flex-grow gap-3">
                      {data.regulation.water_base_min_weight !== "NaN" && (
                        <div className=" flex flex-grow w-1/2 p-4 flex-col justify-between rounded-md bg-sky-700 text-slate-200">
                          <div className="flex justify-start text-3xl ">Мин. вес</div>
                          <div className="flex justify-end text-5xl">
                            {data.regulation.org_base_min_weight !== "NaN"
                              ? `${data.regulation.org_base_max_weight} + ${data.regulation.water_base_min_weight}`
                              : data.regulation.water_base_min_weight}
                          </div>
                        </div>
                      )}
                      {data.regulation.water_base_max_weight !== "NaN" && (
                        <div className=" flex  flex-grow w-1/2 p-4 flex-col justify-between rounded-md bg-green-700 text-slate-200">
                          <div className="flex justify-start text-3xl ">Макс. вес</div>
                          <div className="flex justify-end text-5xl">
                            {data.regulation.org_base_max_weight !== "NaN"
                              ? `${data.regulation.org_base_max_weight} + ${data.regulation.water_base_min_weight}`
                              : data.regulation.water_base_min_weight}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {(data.regulation.per_box !== 0 ||
                    data.regulation.box_per_row !== 0 ||
                    data.regulation.row_on_pallet !== 0) && (
                    <div className="flex flex-row flex-grow gap-3">
                      {data.regulation.per_box !== 0 && (
                        <div className=" flex  flex-grow w-1/3 p-4 flex-col justify-between rounded-md bg-lime-700 text-slate-200">
                          <div className="flex justify-start text-3xl ">В коробе</div>
                          <div className="flex justify-end text-5xl">{data.regulation.per_box}</div>
                        </div>
                      )}
                      {data.regulation.box_per_row !== 0 && (
                        <div className=" flex  flex-grow w-1/3 p-4 flex-col justify-between rounded-md bg-pink-700 text-slate-200">
                          <div className="flex justify-start text-3xl ">Коробов в ряду</div>
                          <div className="flex justify-end text-5xl">{data.regulation.box_per_row}</div>
                        </div>
                      )}
                      {data.regulation.row_on_pallet !== 0 && (
                        <div className=" flex flex-grow w-1/3 p-4 flex-col justify-between rounded-md bg-yellow-700 text-slate-200">
                          <div className="flex justify-start text-3xl ">Рядов на паллете</div>
                          <div className="flex justify-end text-5xl">{data.regulation.row_on_pallet}</div>
                        </div>
                      )}
                    </div>
                  )}
                  {(data.regulation.gasket || data.regulation.seal) && (
                    <div className="flex flex-row flex-grow gap-3">
                      {data.regulation.gasket && (
                        <div className=" flex flex-grow w-1/2 p-4 flex-col  gap-3 rounded-md bg-amber-700 text-slate-200">
                          <div className="flex justify-start text-3xl ">Прокладка:</div>
                          <div className="flex justify-left items-center text-2xl ">
                            {data.regulation.gasket ? data.regulation.gasket : " "}
                          </div>
                        </div>
                      )}
                      {data.regulation.seal && (
                        <div className=" flex w-1/2 p-4 flex-col justify-center  animate-pulse rounded-md bg-cyan-700 text-slate-200">
                          <div className="flex justify-center items-center text-4xl ">Не запечатываем</div>
                        </div>
                      )}
                    </div>
                  )}
                  {data.regulation.technician_note && (
                    <div className=" flex w-full p-4 flex-col  flex-grow gap-3 justify-start rounded-md bg-green-700 text-slate-200">
                      <div className="flex justify-start text-3xl ">Примечания для техников:</div>
                      <div className="flex justify-start text-2xl">
                        {data.regulation.technician_note ? data.regulation.technician_note : " "}
                      </div>
                    </div>
                  )}
                  {data.regulation.packaging_note && (
                    <div className=" flex w-full p-4 flex-col  flex-grow gap-3 justify-start rounded-md bg-cyan-700 text-slate-200">
                      <div className="flex justify-start text-3xl ">Примечания для фасовки:</div>
                      <div className="flex justify-start text-2xl">
                        {data.regulation.packaging_note ? data.regulation.packaging_note : " "}
                      </div>
                    </div>
                  )}
                </div>
                {data.regulation.marking_sample_value && (
                  <div className="flex w-1/4  flex-col  justify-between p-4  gap-4 rounded-md bg-orange-700 text-slate-200">
                    <div className="flex justify-start text-3xl ">Маркировка</div>
                    <div className="flex flex-col gap-2">
                      {data.regulation.inc_color && (
                        <div className="flex justify-start text-2xl">Цвет чернил: {data.regulation.inc_color}</div>
                      )}
                      {data.regulation.marking_feature && (
                        <div className="flex justify-start text-xl">{data.regulation.marking_feature}</div>
                      )}
                      <img
                        className="object-fill rounded-md"
                        alt={`http://ones-esb-vm:9000/manufacturing/templates/marking/${data.regulation.marking_sample_value}.jpg`}
                        src={`http://ones-esb-vm:9000/manufacturing/templates/marking/${data.regulation.marking_sample_value}.jpg`}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        {/* {isSuccess && <RegulationDetail productId={data?.productId} />} */}
      </div>
    </div>
  );
}
