import { useNavigate, useParams } from "react-router-dom";
import { RouteParams } from "../../shared/router/route-params";

export default function RecordDetail() {
  const params = useParams<RouteParams.RECORD_PARAMS>();
  const recordId: string | undefined = params.record_id;
  const navigate = useNavigate();

  return (
    <div className=" h-dvh bg-gray-950 overflow-hidden py-2">
      <div
        className="absolute bottom-5 right-5 rounded-full w-24 h-24 z-50 flex items-center justify-center
        text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium "
        // bg-slate-100 text-slate-500"
        onClick={() => navigate(-1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-12"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
        </svg>
      </div>
      <div className="overflow-y-auto h-full   scrollbar-none">
        <div className="text-slate-50 text-3xl">Данные по строке {recordId}</div>
      </div>
    </div>
  );
}
