import { useNavigate } from "react-router";
import { IDocRow } from "../../records-service";
import { RouteNames } from "../../shared/router/route-names";
export default function CardComponent(item: IDocRow) {
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
              ${item.isUpdated && "animate-pulse"}
              `}
    >
      <div className="text-slate-200 text-5xl font-semibold pl-3 pt-2 ">{item.conveyor}</div>
      <div className="grid grid-cols-6 pl-3 pr-3 pt-2 ">
        <div className="text-slate-200 col-span-4 text-left text-xl"> {item.product}</div>
        <div className="text-slate-200 col-span-2 font-semibold text-right text-xl"> {item.boil}</div>
      </div>
      <div
        className={`font-ultralight text-lg  pl-3  pb-1
        ${
          item.stateValue === "base_check" || item.stateValue === "base_correct" || item.stateValue === "base_continue"
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
      <div className={`${item.stateValue === "product_in_progress" ? "absolute top-2 right-2 " : "invisible"}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6 stroke-slate-50 animate-pulse"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
          />
        </svg>
      </div>
      <div
        className={`${
          item.stateValue === "product_check" || item.stateValue === "product_correct"
            ? "absolute top-2 right-2 "
            : "invisible"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6 stroke-slate-50"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      </div>
      <div className={`${item.stateValue === "product_pass" ? "absolute top-2 right-2 " : "invisible"}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6 fill-none stroke-slate-50"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5"
          />
        </svg>
      </div>

      <div className={`${item.stateValue === "product_finished" ? "absolute top-2 right-2 " : "invisible"}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6 fill-none stroke-slate-50"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>
      <div className={`${item.stateValue === "product_fail" ? "absolute top-2 right-2 " : "invisible"}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6 fill-none stroke-slate-50"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
          />
        </svg>
      </div>
    </div>
  );
}
