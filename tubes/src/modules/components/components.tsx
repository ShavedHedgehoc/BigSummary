import React from "react";
export default function Components({ conveyor }: { conveyor: string }) {
  const mockChecks = [
    {
      id: 1,
      code: "063754",
      name: "Бушон РК 214F, белый (LOVE, CELEBRITY)",
      lot: "20365489759123658964",
      time: "14:36:15",
    },
    {
      id: 2,
      code: "068813",
      name: "Рондоль D28*L129 (Алюмар 27,7*3,4 мм, Инкомпро 27,7*3,8 мм)",
      lot: "20365489759123658964",
      time: "14:36:15",
    },
    {
      id: 3,
      code: "068972",
      name: "Внутренний лак бежевый (VPL Novacan T-IL300, Metlac 716401)",
      lot: "20365489759123658964",
      time: "14:36:15",
    },
    {
      id: 4,
      code: "068815",
      name: "Внешний лак белый (МеталДекор эмаль CC-4215, VPL Novacan T-W 100/1)",
      lot: "20365489759123658964",
      time: "14:36:15",
    },
    {
      id: 5,
      code: "068971",
      name: "Латекс (VPL Novacan T-D 125)",
      lot: "20365489759123658964",
      time: "14:36:15",
    },
    {
      id: 6,
      code: "067972",
      name: "Ожиритель (стеарат цинка, арахинат цинка)",
      lot: "20365489759123658964",
      time: "14:36:15",
    },
    {
      id: 7,
      code: "069193",
      name: "Краска Синия TV-Pantone 2758C",
      lot: "20365489759123658964",
      time: "14:36:15",
    },
    {
      id: 1,
      code: "068817",
      name: "Растворитель (BS-277, VPL Novacan V600, VPL Novacan V200, Metlac 766015)",
      lot: "20365489759123658964",
      time: "14:36:15",
    },
  ];
  return (
    <React.Fragment>
      <div className="flex flex-col flex-grow  w-1/3 h-full items-center justify-start rounded-lg bg-gray-900 1border border-stone-600 px-4  gap-2 py-4">
        <div className="flex text-2xl text-slate-300 py-2 ">Комплектующие</div>
        <div className="flex flex-grow w-full">
          <div className="h-0 min-h-full overflow-y-auto  w-full  rounded-xl bg-gray-700 scrollbar-none">
            <div className="h-full min-h-0 py-2 px-2">
              {mockChecks.map((item) => (
                <div
                  className="flex flex-row flex-grow-0 text-slate-300 text-1xl items-center justify-start py-2 px-4 gap-4  my-1"
                  key={item.id}
                >
                  <div>{item.time}: </div>
                  <div className="text-xs">
                    <div>{item.code}:</div>
                    <div>{item.name}</div>
                    <div>{item.lot}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
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
