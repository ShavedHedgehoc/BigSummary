import { useNavigate } from "react-router";
import { IDocRow } from "../../records-service";
import { RouteNames } from "../../shared/router/route-names";
import { formatTimeToString } from "../../shared/helpers/date-time-formatters";
export default function SummaryRow(item: IDocRow) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`${RouteNames.RECORD}/${item.id}`)}
      className={`h-32 w-full rounded-md relative
              ${item.stateValue === "plug_pass" && "bg-slate-600"} 
              ${item.stateValue === "base_continue" && "bg-slate-600"} 
              ${item.stateValue === "base_correct" && "bg-slate-600"} 
              ${item.stateValue === "product_in_progress" && "bg-sky-700"}               
              ${item.stateValue === "product_pass" && "bg-green-700"} 
              ${(item.stateValue === "product_check" || item.stateValue === "product_correct") && "bg-yellow-700"} 
              ${item.stateValue === "product_fail" && "bg-red-700"} 
              ${item.stateValue === "base_check" && "bg-slate-600"}
              ${item.stateValue === "base_fail" && "bg-slate-600"}
              ${item.stateValue === "product_finished" && "bg-fuchsia-700"}
              ${item.stateValue === null && "bg-slate-900"}
              ${item.isUpdated && "animate-pulse"}
              `}
    >
      <div className="w-full h-full grid grid-cols-6 grid-rows-1 gap-2 rounded-md p-2">
        <div className="rounded-md  text-slate-200 text-6xl font-semibold self-center">
          <div className="text-center align-text-top">{item.conveyor}</div>
        </div>

        <div className="col-span-2 rounded-md  text-slate-200 text-4xl font-semibold self-center">
          <div className="text-center align-text-top">{item.product}</div>
        </div>
        <div className="rounded-md text-slate-200   text-4xl font-semibold self-center">
          <div className="text-center align-text-top">{item.boil}</div>
        </div>
        <div className="col-span-2 rounded-md text-2xl font-semibold self-center">
          <div
            className={`font-ultralight  text-center align-text-top 
                   ${
                     item.stateValue === "base_check" ||
                     item.stateValue === "base_correct" ||
                     item.stateValue === "base_continue"
                       ? "text-yellow-500"
                       : item.stateValue === "base_fail"
                       ? "text-red-500"
                       : item.stateValue === "plug_pass"
                       ? "text-green-500"
                       : "text-slate-200"
                   }
        `}
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
                ? " font-ultralight  text-center align-text-top text-slate-200"
                : "invisible"
            }`}
          >
            {formatTimeToString(item.stateTime)}
          </div>
        </div>
      </div>
    </div>
  );
}
