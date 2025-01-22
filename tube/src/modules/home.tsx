import React from "react";
import Keyboard from "react-simple-keyboard";

// import { KeyboardReact as Keyboard } from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
export default function Home() {
  const criterias = [
    { label: "Жесткость", key: "1" },
    { label: "Мягкость", key: "2" },
    { label: "Крутость", key: "3" },
    { label: "Цвет", key: "4" },
    { label: "Толщина лака", key: "5" },
    { label: "Преломление", key: "6" },
    { label: "Какая-то фигня", key: "7" },
    { label: "Не придумал", key: "8" },
    { label: "Пусть будет", key: "9" },
  ];
  const [value, setValue] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  return (
    <>
      <div className="main_container flex flex-col gap-3 w-full h-dvh p-3  bg-slate-950">
        <div className="main_header flex w-full h-20 items-center justify-center p-3 rounded-md bg-zinc-800">
          <div className="font-sans font-bold text-4xl text-white">Какой-то заголовок</div>
        </div>
        <div className="flex flex-row  flex-grow w-full  rounded-md  gap-3 ">
          <div className=" flex-grow w-2/3 rounded-md bg-zinc-800 p-3">
            <div className="text-2xl text-amber-500">Критерии для контроля</div>
            <div className="grid  grid-cols-4  gap-3 rounded-md border-solid border border-slate-400 p-3">
              {criterias.map((item) => (
                <div className="flex flex-col p-3 h-16 rounded-md" onClick={() => setVisible(true)}>
                  <input type="text" key={item.key} value={value} />
                  <label className="text-slate-400">{item.label}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex w-1/3 flex-grow rounded-md items-center p-3 bg-zinc-800">1</div>
          {/* <div
            className={`  ${
              visible
                ? " flex   rounded-md items-center  bg-zinc-800 w-1/3 p-3 transform  transition-transform duration-600 "
                : "w-0"
            }`}
            onClick={() => setVisible(false)}
          >
            {visible && <Keyboard layout={{ default: ["7 8 9", "4 5 6", "1 2 3", "0 .", "enter"] }} />}
          </div> */}
        </div>
        <div className="main_header flex w-full items-center justify-end p-3 rounded-md bg-zinc-800">
          <div className="  text-sm text-gray-300">Какая-то служебная инфа</div>
        </div>
      </div>

      {/* <div className="absolute bottom-0 left-0 h-64 w-full "> */}

      {/* </div> */}
    </>
  );
}
