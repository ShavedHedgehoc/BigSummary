import { useNavigate } from "react-router";
import { IDocRow } from "../../shared/api/services/doc-service";
import { RouteNames } from "../../shared/router/route-names";
import StopIcon from "../../shared/components/icons/stop-icon";
import CheckIcon from "../../shared/components/icons/check-icon";
import StarsIcon from "../../shared/components/icons/stars-icon";
import ClockIcon from "../../shared/components/icons/clock-icon";
import FlagIcon from "../../shared/components/icons/flag-icon";
import { formatTimeToString } from "../../shared/helpers/date-time-formatters";

export default function SummaryCard(item: IDocRow) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`${RouteNames.RECORD}/${item.id}`)}
      className={`h-32 w-full rounded-md relative
        ${item.stateValue === "product_in_progress" && "bg-sky-700"}               
        ${item.stateValue === "product_pass" && "bg-green-700"} 
        ${(item.stateValue === "product_check" || item.stateValue === "product_correct") && "bg-yellow-700"} 
        ${item.stateValue === "product_fail" && "bg-red-700"} 
        ${
          (item.stateValue === "base_correct" ||
            item.stateValue === "base_continue" ||
            item.stateValue === "plug_pass" ||
            item.stateValue === "base_check" ||
            item.stateValue === "base_fail") &&
          "bg-slate-600"
        }              
        ${item.stateValue === "product_finished" && "bg-fuchsia-700"}
        ${item.stateValue === null && "bg-slate-900"}
        ${item.isUpdated && "animate-pulse"}`}
    >
      <div className="text-slate-200 text-5xl font-semibold pl-3 pt-2 ">{item.conveyor}</div>
      <div className="grid grid-cols-6 pl-3 pr-3 pt-2 ">
        <div className="text-slate-200 col-span-4 text-left text-xl"> {item.product}</div>
        <div className="text-slate-200 col-span-2 font-semibold text-right text-xl"> {item.boil}</div>
      </div>
      <div
        className={`font-ultralight text-lg  pl-3  pb-1 ${
          item.stateValue === "base_check" || item.stateValue === "base_correct" || item.stateValue === "base_continue"
            ? "text-yellow-500"
            : item.stateValue === "base_fail"
            ? "text-red-500"
            : item.stateValue === "plug_pass"
            ? "text-green-500"
            : "text-slate-200"
        }`}
      >
        {item.state}
      </div>

      <div
        className={`${
          item.stateValue === "product_check" ||
          item.stateValue === "product_pass" ||
          item.stateValue === "product_fail" ||
          item.stateValue === "product_correct" ||
          item.stateValue === "product_in_progress" ||
          item.stateValue === "product_finished"
            ? "absolute bottom-2 right-2  text-slate-200 pr-1"
            : "invisible"
        }`}
      >
        {formatTimeToString(item.stateTime)}
      </div>

      <div className={`${item.stateValue === "product_in_progress" ? "absolute top-2 right-2 " : "invisible"}`}>
        <StarsIcon />
      </div>
      <div
        className={`${
          item.stateValue === "product_check" || item.stateValue === "product_correct"
            ? "absolute top-2 right-2 "
            : "invisible"
        }`}
      >
        <ClockIcon />
      </div>
      <div className={`${item.stateValue === "product_pass" ? "absolute top-2 right-2 " : "invisible"}`}>
        <FlagIcon />
      </div>

      <div className={`${item.stateValue === "product_finished" ? "absolute top-2 right-2 " : "invisible"}`}>
        <CheckIcon />
      </div>
      <div className={`${item.stateValue === "product_fail" ? "absolute top-2 right-2 " : "invisible"}`}>
        <StopIcon />
      </div>
    </div>
  );
}
