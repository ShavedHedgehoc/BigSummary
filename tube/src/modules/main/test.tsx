import { HomeIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import Chart from "react-apexcharts";

export default function Test() {
  return (
    <div className="main w-full h-dvh overflow-hidden bg-gray-950 flex flex-col ">
      <div className="header h-8 bg-gray-900 flex flex-row justify-between ">
        <div className=" flex items-center justify-start pl-3 text-gray-400 text-sm font-medium">Линия 1 - Пост 1</div>
        <div className=" flex items-center justify-end pr-3 text-gray-400 text-sm font-medium">16:30:23</div>
      </div>
      <div className="main flex flex-grow  pl-1 pr-1 gap-1">
        <div className="content flex flex-col w-full flex-grow bg-blue-gray-900 border-r-0 border-gray-700">
          <div className="flex flex-col   mx-4 py-4  gap-2">
            <div className="font-medium text-xl text-gray-50">Туба PRINCE BASE 100 мл D 35 мм металлическая 2023</div>
            <div className="font-medium text-xl text-gray-400">Партия: 0578142301202501</div>
          </div>
          <div className="flex w-full bg-purple-400">
            <Chart
              options={{
                chart: { id: "plan", background: "none", toolbar: { show: false } },
                theme: { mode: "dark" },

                xaxis: {
                  categories: [
                    //     "00-00",
                    //     "01-00",
                    //     "02-00",
                    //     "03-00",
                    //     "04-00",
                    //     "05-00",
                    //     "06-00",
                    //     "07-00",
                    //     "08-00",
                    //     "09-00",
                  ],
                },
              }}
              series={[{ name: "Выпуск", data: [1000, 2000, 2500, 3000, 6000, 8000, 7000] }]}
              height={300}
              width={1500}
            />
          </div>
        </div>
        <div className="sidebar flex flex-col w-60 gap-1">
          <div className="status p-4 bg-gray-900 h-64 w-full flex flex-col justify-between items-center">
            <div className="text-gray-200 text-2xl font-medium ">СТАТУС</div>

            <div className="relative size-40">
              <svg className="rotate-[135deg] size-full" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  className="stroke-current text-gray-200 dark:text-neutral-700"
                  stroke-width="1.5"
                  stroke-dasharray="75 100"
                  stroke-linecap="round"
                ></circle>

                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  className="stroke-current text-green-600 dark:text-gren-500"
                  stroke-width="1.5"
                  stroke-dasharray="37.5 100"
                  stroke-linecap="round"
                ></circle>
              </svg>

              <div className="absolute top-1/2 start-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="text-4xl font-bold text-green-500 dark:text-green-500">50</span>
                <span className="text-green-500 dark:text-green-500 block">РАБОТАЕТ</span>
              </div>
            </div>

            {/* <div className="h-32 w-32 rounded-full bg-green-400"></div> */}
            {/* <div className="text-gray-200 text-2xl font-medium">РАБОТАЕТ</div> */}
          </div>
          <div className="controls flex flex-grow flex-col justify-start items-start gap-1  bg-gray-950">
            <div className=" w-full h-24 flex flex-row items-center justify-start gap-6 pl-2 bg-gray-900">
              <HomeIcon className="h-10 w-10 text-gray-50" />
              <div className="text-gray-50 text-2xl font-medium">ГЛАВНАЯ</div>
            </div>
            <div className="w-full h-24 flex flex-row items-center justify-start gap-6 pl-2 bg-gray-900">
              <HomeIcon className="h-10 w-10 text-gray-50" />
              <div className="text-gray-50 text-2xl font-medium">ГЛАВНАЯ</div>
            </div>
            <div className=" w-full  h-24 flex flex-row items-center justify-start gap-6 pl-2 bg-gray-900">
              <HomeIcon className="h-10 w-10 text-gray-50" />
              <div className="text-gray-50 text-2xl font-medium">ГЛАВНАЯ</div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer h-16 flex flex-row gap-2 border-t-0 border-gray-700 bg-gray-950">
        <div className=" h-full w-64 flex flex-row items-center justify-center gap-6">
          <HomeIcon className="h-10 w-10 text-gray-50" />
          <div className="text-gray-50 text-2xl font-medium">ГЛАВНАЯ</div>
        </div>
        <div className=" h-full w-64 flex flex-row items-center justify-center gap-6 border-t-2 border-green-500">
          <InformationCircleIcon className="h-10 w-10 text-green-500" />
          <div className="text-green-500 text-2xl font-medium">ИНФО</div>
        </div>
      </div>

      {/* <div className="flex flex-col  items-center mx-4 py-4 px-4 gap-2">
        <div className="font text-4xl text-gray-50">Линия №1</div>
        <div className="font-medium text-3xl text-gray-400">Пост 4</div>
      </div> */}
      {/* <div className="bg-gray-900">
        <div className="flex flex-col border-b border-gray-700 mx-4 py-4  gap-2">
          <div className="font-medium text-xl text-gray-50">Туба PRINCE BASE 100 мл D 35 мм металлическая 2023</div>
          <div className="font-medium text-xl text-gray-400">Партия: 0578142301202501</div>
        </div>
      </div> */}
    </div>
  );
}
