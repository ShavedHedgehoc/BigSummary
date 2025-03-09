import clsx from "clsx";
import React from "react";
export default function Product({ conveyor }: { conveyor: string }) {
  const mockChecks = [
    {
      id: 1,
      code: "063754",
      name: "Бушон РК 214F, белый (LOVE, CELEBRITY)",
      lot: "-",
      time: "14:36:15",
      post: 4,
    },
    {
      id: 2,
      code: "068813",
      name: "Рондоль D28*L129 (Алюмар 27,7*3,4 мм, Инкомпро 27,7*3,8 мм)",
      lot: "20365489759123658964",
      time: "14:36:15",
      post: 1,
    },
    {
      id: 3,
      code: "068972",
      name: "Внутренний лак бежевый (VPL Novacan T-IL300, Metlac 716401)",
      lot: "20365489759123658964",
      time: "14:36:15",
      post: 2,
    },
    {
      id: 4,
      code: "068815",
      name: "Внешний лак белый (МеталДекор эмаль CC-4215, VPL Novacan T-W 100/1)",
      lot: "20365489759123658964",
      time: "14:36:15",
      post: 2,
    },
    {
      id: 5,
      code: "068971",
      name: "Латекс (VPL Novacan T-D 125)",
      lot: "-",
      time: "14:36:15",
      post: 2,
    },
    {
      id: 6,
      code: "067972",
      name: "Ожиритель (стеарат цинка, арахинат цинка)",
      lot: "20365489759123658964",
      time: "14:36:15",
      post: 1,
    },
    {
      id: 7,
      code: "069193",
      name: "Краска Синия TV-Pantone 2758C",
      lot: "20365489759123658964",
      time: "14:36:15",
      post: 2,
    },
    {
      id: 1,
      code: "068817",
      name: "Растворитель (BS-277, VPL Novacan V600, VPL Novacan V200, Metlac 766015)",
      lot: "20365489759123658964",
      time: "14:36:15",
      post: 1,
    },
  ];
  return (
    <React.Fragment>
      <div className="flex flex-col w-1/3 flex-shrink h-full items-center justify-start rounded-lg bg-gray-900 1border border-stone-600 px-4  gap-2 py-4">
        <div className="flex text-2xl text-slate-300 py-2 ">Продукт</div>
        <div className="flex flex-col w-full px-2 gap-1 text-1xl">
          <div className="text-slate-300">030874 Туба LOVE 50 мл D 28 мм металлическая</div>
          <div className="text-slate-300">Партия: 235В</div>
          <div className="text-slate-300">План: 10000</div>
          <div className="text-slate-300">Выпуск: 2400</div>
        </div>
        <div className="flex text-2xl text-slate-300 py-2 ">Комплектующие поста</div>
        <div className="flex flex-grow w-full">
          <div className="h-0 min-h-full overflow-y-auto  w-full  rounded-xl bg-gray-800 scrollbar-none">
            <div className="h-full min-h-0 py-2 px-2">
              {mockChecks
                .filter((x) => x.post === 1)
                .map((item) => (
                  <div
                    className="flex flex-row text-slate-300 text-1xl items-center justify-start py-2 px-4 gap-4  my-1"
                    key={item.id}
                  >
                    <div className="text-sm">{item.code}</div>
                    <div className="text-sm block w-full gap-2">
                      {/* <div className="flex flex-row w-full items-center"> */}
                      <span>{item.name}</span>
                      <p className="text-xs">
                        <span>Партия: </span>
                        <span className={clsx(["text-xs"], [item.lot === "-" ? "text-red-500" : "text-green-500"])}>
                          {item.lot === "-" ? "Не внесена" : item.lot}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="flex text-2xl text-slate-300 py-2 ">Текущие комплектующие</div>
        <div className="flex flex-grow w-full">
          <div className="h-0 min-h-full overflow-y-auto  w-full  rounded-xl bg-gray-800 scrollbar-none">
            <div className="h-full min-h-0 py-2 px-2">
              {mockChecks.map((item) => (
                <div
                  className="flex flex-row text-slate-300 text-1xl items-center justify-start py-2 px-4 gap-4  my-1"
                  key={item.id}
                >
                  <div className="text-sm">{item.code}</div>
                  <div className="text-sm block w-full gap-2">
                    {/* <div className="flex flex-row w-full items-center"> */}
                    <span>{item.name}</span>
                    <p className="text-xs">
                      <span>Партия: </span>
                      <span className={clsx(["text-xs"], [item.lot === "-" ? "text-red-500" : "text-green-500"])}>
                        {item.lot === "-" ? "Не внесена" : item.lot}
                      </span>
                    </p>
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
