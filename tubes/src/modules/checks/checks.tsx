import React from "react";
export default function Checks({ conveyor }: { conveyor: string }) {
  const mockChecks = [
    { id: 1, name: "Толщина тубы", value: 0.05, time: "14:36:15" },
    { id: 2, name: "Герметичность", value: "Проверена", time: "14:36:15" },
    { id: 3, name: "Резьба", value: 0.05, time: "14:36:15" },
  ];
  return (
    <React.Fragment>
      <div className="flex flex-col w-1/3 h-full items-center justify-start rounded-lg bg-gray-900 1border border-stone-600 px-4  gap-2 py-4">
        <div className="flex text-2xl text-slate-300 py-2 ">Операционный контроль</div>
        <div className="flex flex-grow w-full">
          <div className="h-0 min-h-full overflow-y-auto  w-full  rounded-xl bg-gray-700 scrollbar-none">
            <div className="h-full min-h-0 py-2 px-2">
              {mockChecks.map((item) => (
                <div
                  className="flex flex-row flex-grow-0 text-slate-300 text-1xl items-center justify-start py-2 px-4 gap-4  my-1"
                  key={item.id}
                >
                  <div>{item.time}: </div>
                  <div>{item.name}:</div>
                  <div>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* <div className="flex flex-row w-full px-4 py-2 rounded-xl bg-gray-700 text-slate-300">
          Следующая проверка: 15:00:00
        </div> */}
        {/* <div
          className="flex flex-row w-full items-center justify-center py-2 px-4 rounded-lg bg-amber-600 text-slate-100 text-1xl font-semibold"
          //   onClick={data?.employee ? () => logout(conveyor) : () => setOpen(true)}
        >
          Внести данные
        </div> */}
      </div>
    </React.Fragment>
  );
}
