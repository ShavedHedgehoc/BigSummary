import { ITraceCanData } from "../../shared/api/services/trace-can-service";
import { formatDateToString, formatTimeToString } from "../../shared/helpers/date-time-formatters";

export default function CansCard({ item }: { item: ITraceCanData }) {
  return (
    <div
      className={`flex flex-col h-40 w-full rounded-md relative px-4 py-2  text-slate-200  justify-between
        ${item.stateValue === "can_from_product" && "bg-slate-600"}  
        ${item.stateValue === null && "bg-slate-600"}
        ${item.stateValue === "can_washed" && "bg-sky-700"}         
        ${item.stateValue === "can_ready" && "bg-green-700"} 
        ${item.stateValue === "can_carantine" && "bg-amber-700"} 
        ${item.stateValue === "can_desinfected" && "bg-fuchsia-700"} 
        ${item.stateValue === "can_need_wash" && "bg-amber-900"} 
        ${item.stateValue === "can_correct" && "bg-yellow-300 text-slate-600"} 
        ${item.isUpdated && "animate-pulse"}`}
    >
      <div className="flex flex-row items-center justify-between w-full ">
        <div className="flex text-3xl font-semibold">{item.name}</div>
        <div className="flex text-2xl font-semibold justify-center items-center">
          V-{item.volume} м<sup className="text-base pl-1">3</sup>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-between w-full pt-1">
          <div className="flex text-1xl font-semibold">{item.baseContainMarking}</div>
          <div className="flex text-1xl font-semibold">{item.baseContain}</div>
        </div>
        <div className="flex justify-start w-full text-2xl pt-1 pb-1 ">{item.state !== "-" ? item.state : ""}</div>
        <div className="flex justify-start w-full text-sm ">{item.author}</div>
        <div className="flex flex-row justify-between font-1xl text-sm">
          {item.state !== "-" && <div>{formatDateToString(item.stateTime)}</div>}
          {item.state !== "-" && <div>{formatTimeToString(item.stateTime)}</div>}
        </div>
      </div>
    </div>
  );
}
